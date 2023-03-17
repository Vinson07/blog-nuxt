import { http } from './request'
import { PostList, ArticleDetail, SearchArticle, SearchArticleParams } from '@/types/article'

// 查看首页文章
export function getPostList(current: number) {
  return http.get<PostList[]>('/api/articles', { params: { current } })
}

// 根据id查看文章
export function getArticleDetail(articleId: string | string[]) {
  return http.get<ArticleDetail>(`/api/articles/${articleId}`)
}

// 搜索文章
export function searchArticle(data: SearchArticleParams) {
  return http.get<SearchArticle[]>('/api/articles/search', { params: data })
}
