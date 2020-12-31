# gatsby-remark-youtube

[![Npm version][badge-npm]][npm]
[![Npm downloads][badge-npm-dl]][npm]
[![MIT license][badge-licence]](./licence.md)
[![PRs welcome][badge-prs-welcome]](#contributing)

`gatsby-remark-youtube` is a [Gatsby](https://www.gatsbyjs.org/) [remark](https://remark.js.org/) plugin to embed [youtube](https://www.youtube.com/) videos with links.

## Usage

1. Download `gatsby-remark-youtube` from the NPM registry:

```shell
yarn add gatsby-remark-youtube
```

2. Add the plugin in your `gatsby-config.js` file

```js
require("dotenv").config()

module.exports = {
    plugins: [
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    "gatsby-remark-youtube",
                    "gatsby-remark-responsive-iframe",
                ],
            },
        },
    ],
}
```

4. Add [youtube](https://www.youtube.com/) video links to your content

```md
[YOUTUBE EMBED: my video](https://www.youtube-nocookie.com/embed/VIDEO_ID)
[embed: my video](https://www.youtube.com/embed/VIDEO_ID)
```

> Text need to contains "embed" to be transformed

## Contributing

-   ⇄ Pull/Merge requests and ★ Stars are always welcome.
-   For bugs and feature requests, please [create an issue][github-issue].

[badge-npm]: https://img.shields.io/npm/v/gatsby-remark-youtube.svg?style=flat-square
[badge-npm-dl]: https://img.shields.io/npm/dt/gatsby-remark-youtube.svg?style=flat-square
[badge-licence]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[badge-prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-remark-youtube
[github-issue]: https://github.com/cedricdelpoux/gatsby-remark-youtube/issues/new
