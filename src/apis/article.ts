import type {
  Article,
  ArticleInfo,
  Archives,
  SearchArticle,
  ArticleRecommend
} from '@/types/article'
import type { HttpOption } from '@/composables/useHttp'
import type { PageQuery, PageResult } from '@/types'

enum Api {
  articleList = '/article/list',
  article = '/article/',
  searchArticle = '/article/search',
  archives = '/archives/list',
  recommend = '/article/recommend'
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

/**
 * 查看推荐文章
 * @returns 推荐文章
 */
export function getArticleRecommend(option?: HttpOption<ArticleRecommend[]>) {
  return useHttp.get<ArticleRecommend[]>(Api.recommend, {}, option)
}

/**
 * 搜索文章
 * @returns 文章列表
 */
export function searchArticle(keyword: string) {
  return useHttp.get<SearchArticle[]>(Api.searchArticle, { keyword })
}

/**
 * 查看文章归档
 * @param params 查询条件
 * @returns 文章归档
 */
export function getArchivesList(params?: PageQuery, option?: HttpOption<PageResult<Archives[]>>) {
  return useHttp.get<PageResult<Archives[]>>(Api.archives, params, option)
}

/**
 * 点赞文章
 * @param articleId 文章id
 */
export function likeArticle(articleId: number) {
  return useHttp.post<null>(`/article/${articleId}/like`)
}
