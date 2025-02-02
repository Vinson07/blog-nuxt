import RSS from 'rss'
import type { Article } from '@/types/article'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { siteUrl, apiBaseUrl } = runtimeConfig.public

  const feed = new RSS({
    title: 'Vinson Blog',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`
  })

  // 获取文章列表
  const posts = await fetch(`${apiBaseUrl}/article/list?current=1&size=1000`).then((res) =>
    res.json()
  )
  if (posts.flag) {
    const recordList: Article[] = posts.data.recordList
    recordList.forEach((post) => {
      const url = `${siteUrl}/post/${post.id}`
      feed.item({
        title: post.articleTitle,
        url,
        guid: url,
        description: post.articleContent,
        date: post.createTime
      })
    })
  }

  const feedString = feed.xml({ indent: true })
  setResponseHeader(event, 'content-type', 'text/xml')
  return feedString
})
