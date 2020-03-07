"use strict";
const visit = require(`unist-util-visit`);
const axios = require(`axios`);

const API_BASE = `https://qiita.com/api/v2/`;

module.exports = async ({ markdownAST }, { accessToken }) => {
  let headers = {
    "Content-Type": `application/json`
  };
  if (accessToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  const http = axios.create({
    baseURL: API_BASE,
    headers
  });

  const isUrlValid = url => {
    const mached = url.match(
      /https:\/\/qiita\.com\/(?!-)[0-9a-zA-Z_-]+\/items\/[0-9a-z]+/
    );
    return mached === null ? false : true;
  };

  const getItemId = url => {
    return url.match(
      /https:\/\/qiita\.com\/(?!-)[0-9a-zA-Z_-]+\/items\/([0-9a-z]+)/
    )[1];
  };

  const nodes = [];

  visit(markdownAST, `inlineCode`, async node => {
    if (node.value.startsWith(`qiita:`)) {
      const postUrl = node.value.substr(6);

      if (isUrlValid(postUrl)) {
        nodes.push(node);
      }
    }
  });

  await Promise.all(
    nodes.map(async node => {
      const postUrl = node.value.substr(6);
      const itemId = getItemId(postUrl);
      const response = await http.get(`/items/${itemId}/`);

      node.type = `html`;
      node.value = `
        <div class="gatsby-qiita-inside-wrapper">
          <div class="gatsby-qiita-inside-body">
            ${response.data.rendered_body}
          </div>

          <div class="gatsby-qiita-inside-foot">
            Qiita: <a href="${response.data.url}" target="_blank" rel="noopener noreferrer">${response.data.title}</a>
          </div>
        </div>
      `;
    })
  );

  return markdownAST;
};
