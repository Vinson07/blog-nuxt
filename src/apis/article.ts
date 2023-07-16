import type {
  PostList,
  ArticleDetail,
  SearchArticle,
  SearchArticleParams,
  archives
} from '@/types/article'
import type { HttpOption } from '@/composables/useHttp'

interface archiveList {
  code: number
  data: archives
  flag: boolean
  message: string
}

enum Api {
  homeArticle = '/articles',
  getArticleById = '/articles/',
  searchArticle = '/articles/search',
  getArchives = '/api/articles/archives'
}

// 查看首页文章
export function getPostList(params: { current: number }, option?: HttpOption<PostList[]>) {
  return useHttp.get<PostList[]>(Api.homeArticle, params, option)
}

// 根据id查看文章
export function getArticleDetail(articleId: string) {
  return useHttp.get<ArticleDetail>(Api.getArticleById + articleId)
}

// 搜索文章
export function searchArticle(params: SearchArticleParams) {
  return useHttp.get<SearchArticle[]>(Api.searchArticle, params)
}

// 查看文章归档
export function getArchives(params: { current: number }) {
  // return useHttp.get<archives>(Api.getArchives, params)
  return $fetch<archiveList>(Api.getArchives, { params })
}

// 点赞文章
export function articleLike(articleId: number) {
  return useHttp.post(`/articles/${articleId}/like`)
}
