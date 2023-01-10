const visit = require("unist-util-visit")

const isYoutubeEmbedLink = (node) => {
  if (!node.url) {
    return false
  }

  try {
    const {host} = new URL(node.url)
    const isYoutubeUrl = host.includes("youtube")
    const isLink = node.type === "link"
    const isEmbedLink =
      node.children.length === 1 &&
      node.children[0].value.toLowerCase().includes("embed")

    return isLink && isEmbedLink && isYoutubeUrl
  } catch (e) {
    return false
  }
}

const getEmbedCode = (url) => {
  const urlObject = new URL(url)
  const videoId = urlObject.searchParams.get("v") // https://www.youtube.com/watch?v=GV3MeVtOBGw
  const {host} = urlObject

  // Attributes
  const src = host && videoId ? `https://${host}/embed/${videoId}` : url
  const style = "width: 100%;aspect-ratio: 16/9;"

  return `<iframe src="${src}" frameborder="0" allowfullscreen style="${style}"></iframe>`
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
