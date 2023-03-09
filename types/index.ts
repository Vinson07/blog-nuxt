export interface Result<T = any> {
  code: number
  message: string
  data: T
}

export interface PageListStore {
  home: string
}

export interface PageList {
  id: number
  pageCover: string
  pageLabel: string
  pageName: string
}

export interface WebsiteConfig {
  alipayQRCode: string
  articleCover: string
  gitee: string
  github: string
  isChatRoom: number
  isCommentReview: number
  isEmailNotice: number
  isMessageReview: number
  isMusicPlayer: number
  isReward: number
  qq: string
  socialLoginList?: any[]
  socialUrlList?: any[]
  touristAvatar: string
  userAvatar: string
  websiteAuthor: string
  websiteAvatar: string
  websiteCreateTime: string
  websiteIntro: string
  websiteName: string
  websiteNotice: string
  websiteRecordNo: string
  websocketUrl: string
  weiXinQRCode: string
}

export interface BlogInfo {
  articleCount: number
  categoryCount: number
  pageList: PageList[]
  tagCount: number
  viewsCount: string
  websiteConfig: WebsiteConfig
}
