export interface IUserInfo {
  articleLikeSet?: any[]
  avatar: string
  commentLikeSet?: any[]
  email: string
  id: number
  intro: string
  ipAddress: string
  ipSource: string
  lastLoginTime: number
  loginType: number
  nickname: string
  talkLikeSet?: any[]
  userInfoId: number
  username: string
  webSite: string
}

export interface IChangePasswordParams {
  code: string
  username: string
  password: string
}

export interface IRegisterParams {
  username: string
  password: string
  code: string
}

export interface IUpdateUserInfoParams {
  nickname: string
  intro: string
  webSite: string
}
