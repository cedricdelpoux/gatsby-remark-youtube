# 1.4.0

-   Added: **Gatsby v5** compatibility
-   Fixed: Embed not rendering under Gatsby v5 / `gatsby-plugin-mdx` (`mdast-util-to-hast` checks `"children" in node`, so a key merely set to `undefined` still crashed)
-   Fixed: Add `web-share` to the iframe `allow` attribute

# 1.3.2

-   Fixed: Add iframe `allow` attribute back

# 1.3.1

-   Fixed: Update iframe `src`

# 1.3.0

-   Added: Use `/embed/` YouTube URLs
-   Fixed: YouTube URLs detection

# 1.2.0

-   Added: 16/9 aspect-ratio
-   Removed: `peerDependencies`

# 1.1.1

-   Fixed: Remove example folder from published package

# 1.1.0

-   Added: **Gatsby v4** compatibility

# 1.0.1

-   Updated: dependencies (fix `lodash` vulnerability)

# 1.0.0

-   Added: `gatsby-remark-youtube` initial commit
