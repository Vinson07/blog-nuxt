export interface TagList {
  id: number
  tagName: string
}

export interface PostList {
  articleContent: string
  articleCover: string
  articleTitle: string
  categoryId: number
  categoryName: string
  createTime: string
  id: number
  isTop: number
  tagDTOList: TagList[]
  type: number
}

export interface LastArticle {
  articleCover: string
  articleTitle: string
  id: number
}

export interface NewestArticleList {
  articleCover: string
  articleTitle: string
  createTime: string
  id: number
}

export interface NextArticle {
  articleCover: string
  articleTitle: string
  id: number
}

export interface RecommendArticleList {
  articleCover: string
  articleTitle: string
  createTime: string
  id: number
}

export interface TagDTOList {
  id: number
  tagName: string
}

export interface ArticleDetail {
  articleContent: string
  articleCover: string
  articleTitle: string
  categoryId: number
  categoryName: string
  createTime: string
  id: number
  lastArticle: LastArticle
  likeCount: number
  newestArticleList: NewestArticleList[]
  nextArticle: NextArticle
  originalUrl: string
  recommendArticleList: RecommendArticleList[]
  tagDTOList: TagDTOList[]
  type: number
  updateTime: string
  viewsCount: number
}

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
