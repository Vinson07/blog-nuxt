import RSS from 'rss'
import type { Article } from '@/types/article'

const baseURL = import.meta.env.VITE_APP_BASE_URL as string
const siteURL = import.meta.env.VITE_APP_WEBSITE as string

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Vinson Blog',
    site_url: siteURL,
    feed_url: `${siteURL}/rss.xml`
  })

  // 获取文章列表
  const posts = await fetch(`${baseURL}/article/list?current=1&size=1000`).then((res) => res.json())
  if (posts.flag) {
    const recordList: Article[] = posts.data.recordList
    recordList.forEach((post) => {
      const url = `${siteURL}/post/${post.id}`
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
  event.node.res.setHeader('content-type', 'text/xml')
  event.node.res.end(feedString)
})
