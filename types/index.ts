export interface Result<T = any> {
  code: number
  message: string
  data: T
}

export interface BlogInfo {
  articleCount: number
  categoryCount: number
  pageList: Array<any>
  tagCount: number
  viewsCount: string
  websiteConfig: object
}
