import type {
  Article,
  ArticleInfo,
  SearchArticle,
  SearchArticleParams,
  Archives
} from '@/types/article'
import type { HttpOption } from '@/composables/useHttp'
import type { PageQuery, PageResult } from '@/types'

enum Api {
  articleList = '/article/list',
  article = '/article/',
  searchArticle = '/articles/search',
  archives = '/archives/list'
}

/**
 * 查看文章列表
 * @param params 查询条件
 * @param option useFetch 配置选项
 * @returns 文章列表
 */
export function getArticleList(params: PageQuery, option?: HttpOption<PageResult<Article[]>>) {
  return useHttp.get<PageResult<Article[]>>(Api.articleList, params, option)
}

/**
 * 查看文章
 * @param articleId 文章id
 */
export function getArticle(articleId: number, option?: HttpOption<ArticleInfo>) {
  return useHttp.get<ArticleInfo>(Api.article + articleId, {}, option)
}

// 搜索文章
export function searchArticle(params: SearchArticleParams) {
  return useHttp.get<SearchArticle[]>(Api.searchArticle, params)
}

/**
 * 查看文章归档
 * @param params 查询条件
 * @returns 文章归档
 */
export function getArchivesList(params?: PageQuery) {
  return useHttp.get<PageResult<Archives[]>>(Api.archives, params)
}

// 点赞文章
export function articleLike(articleId: number) {
  return useHttp.post(`/articles/${articleId}/like`)
}
