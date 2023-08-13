import type { HttpOption } from '@/composables/useHttp'
import type { Category } from '@/types/category'
import type { ArticleConditionList, ArticleQuery } from '@/types/article'

enum Api {
  categoryList = '/category/list',
  articleList = '/category/article'
}

/**
 * 查看文章分类
 * @returns 文章分类
 */
export function getCategoryList(option?: HttpOption<Category[]>) {
  return useHttp.get<Category[]>(Api.categoryList, {}, option)
}

/**
 * 查看分类文章
 * @returns 文章分类
 */
export function getCategoryArticleList(
  params: ArticleQuery,
  option?: HttpOption<ArticleConditionList>
) {
  return useHttp.get<ArticleConditionList>(Api.articleList, params, option)
}
