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
