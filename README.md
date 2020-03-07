# gatsby-remark-qiita-inside

Embed a Qiita post in your Markdown

## Install

1. Install plugin to your site:

```bash
npm install gatsby-remark-qiita-inside --save
```

2. Add following to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-qiita-inside`,
            options: {
              accessToken: 'YOUR_QIITA_PERSONAL_ACCESS_TOKEN',
            },
          },
        ],
      },
    },
  ],
};
```

## Usage

Set Qiita post url. ex) `https://qiita.com/Qiita/items/c686397e4a0f4f11683d`

```md
# Hello Qiita
`qiita:https://qiita.com/Qiita/items/c686397e4a0f4f11683d`
```

Set StyleSheet as you like.

```css
.gatsby-qiita-inside-body {
  border: 1px solid #1b262c;
  box-shadow: 4px 4px #55c500;
  height: 420px;
  margin: 1.6rem 0;
  overflow: auto;
  padding: 1.6rem 2.4rem;
  width: 100%;
}

.gatsby-qiita-inside-foot {
  margin-bottom: 2.4rem;
  text-align: right;
}
```

## License

MIT
