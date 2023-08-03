import type { CategoryVO } from './category'
import type { TagVO } from './tag'

/**
 * 文章
 */
export interface Article {
  /**
   * 文章id
   */
  id: number
  /**
   * 文章缩略图
   */
  articleCover: string
  /**
   * 文章标题
   */
  articleTitle: string
  /**
   * 文章内容
   */
  articleContent: string
  /**
   * 文章分类
   */
  category: CategoryVO
  /**
   * 文章标签
   */
  tagVOList: TagVO[]
  /**
   * 是否置顶 (0否 1是)
   */
  isTop: number
  /**
   * 发表时间
   */
  createTime: string
}

/**
 * 文章上下篇
 */
export interface ArticlePagination {
  /**
   * 文章id
   */
  id: number
  /**
   * 文章缩略图
   */
  articleCover: string
  /**
   * 文章标题
   */
  articleTitle: string
}

/**
 * 文章信息
 */
export interface ArticleInfo {
  /**
   * 文章id
   */
  id: number
  /**
   * 文章缩略图
   */
  articleCover: string
  /**
   * 文章标题
   */
  articleTitle: string
  /**
   * 文章内容
   */
  articleContent: string
  /**
   * 文章类型 (1原创 2转载 3翻译)
   */
  articleType: number
  /**
   * 浏览量
   */
  viewCount: number
  /**
   * 点赞量
   */
  likeCount: number
  /**
   * 文章分类
   */
  category: CategoryVO
  /**
   * 文章标签
   */
  tagVOList: TagVO[]
  /**
   * 发表时间
   */
  createTime: string
  /**
   * 上一篇文章
   */
  lastArticle: ArticlePagination
  /**
   * 下一篇文章
   */
  nextArticle: ArticlePagination
  /**
   * 更新时间
   */
  updateTime: string
}

// export interface TagList {
//   id: number
//   tagName: string
// }

// export interface PostList {
//   articleContent: string
//   articleCover: string
//   articleTitle: string
//   categoryId: number
//   categoryName: string
//   createTime: string
//   id: number
//   isTop: number
//   tagDTOList: TagList[]
//   type: number
// }

// export interface LastArticle {
//   articleCover: string
//   articleTitle: string
//   id: number
// }

// export interface NewestArticleList {
//   articleCover: string
//   articleTitle: string
//   createTime: string
//   id: number
// }

// export interface NextArticle {
//   articleCover: string
//   articleTitle: string
//   id: number
// }

// export interface RecommendArticleList {
//   articleCover: string
//   articleTitle: string
//   createTime: string
//   id: number
// }

// export interface TagDTOList {
//   id: number
//   tagName: string
// }

// export interface ArticleDetail {
//   articleContent: string
//   articleCover: string
//   articleTitle: string
//   categoryId: number
//   categoryName: string
//   createTime: string
//   id: number
//   lastArticle: LastArticle
//   likeCount?: any
//   newestArticleList: NewestArticleList[]
//   nextArticle: NextArticle
//   originalUrl: string
//   recommendArticleList: RecommendArticleList[]
//   tagDTOList: TagDTOList[]
//   type: number
//   updateTime: string
//   viewsCount: number
// }

export interface SearchArticle {
  articleContent: string
  articleTitle: string
  id: number
  isDelete: number
  status: number
}

export interface SearchArticleParams {
  current: number
  keywords: string
}

export interface RecordList {
  articleTitle: string
  createTime: string
  id: number
}
export interface archives {
  count: number
  recordList: RecordList[]
}
