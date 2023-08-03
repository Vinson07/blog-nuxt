export interface SiteConfig {
  aboutMe: string
  aliCode: string
  articleCover: string
  authorAvatar: string
  bilibili: string
  commentCheck: number
  createSiteTime: string
  emailNotice: number
  gitee: string
  github: string
  id: number
  isChat: number
  isMusic: number
  isReward: number
  loginList: string
  messageCheck: number
  musicId: string
  qq: string
  recordNumber: string
  siteAddress: string
  siteAuthor: string
  siteIntro: string
  siteName: string
  siteNotice: string
  socialList: string
  touristAvatar: string
  userAvatar: string
  websocketUrl: string
  weiXinCode: string
}

export interface BlogInfo {
  articleCount: number
  categoryCount: number
  siteConfig: SiteConfig
  tagCount: number
  viewCount: string
}
