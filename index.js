const visit = require("unist-util-visit")

const isYoutubeEmbedLink = (node) => {
  if (!node.url) {
    return false
  }

  try {
    const {host, pathname} = new URL(node.url)
    const isYoutubeActivityLink =
      (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) &&
      pathname.includes("/embed/")
    const isLink = node.type === "link"
    const isEmbedLink =
      node.children.length === 1 &&
      node.children[0].value.toLowerCase().includes("embed")

    return isLink && isEmbedLink && isYoutubeActivityLink
  } catch (e) {
    return false
  }
}

const getEmbedCode = (url) => {
  return `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

module.exports = async ({markdownAST, cache, reporter}, pluginOptions) => {
  try {
    const youtubeElements = []

    visit(markdownAST, "paragraph", (paragraphNode) => {
      if (paragraphNode.children.length !== 1) {
        return
      }

      const [node] = paragraphNode.children

      if (!isYoutubeEmbedLink(node)) {
        return
      }

      youtubeElements.push(node)
    })

    await Promise.all(
      youtubeElements.map(async (node) => {
        try {
          let html = await cache.get(node.url)

          if (!html) {
            html = getEmbedCode(node.url)

            await cache.set(node.url, html)
          }

          node.type = `html`
          node.value = html
          node.children = undefined

          if (pluginOptions.debug) {
            reporter.success(`remark-youtube: EMBED OK ${node.url}`)
          }
        } catch (e) {
          if (pluginOptions.debug) {
            reporter.warn(`remark-youtube: EMBED NOK ${node.url}`)
          }
        }
      })
    )
  } catch (e) {
    reporter.warn(`remark-youtube: ${e.message}`)
  }

  return markdownAST
}
