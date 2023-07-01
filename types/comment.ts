export interface CommentListParams {
  current: number
  type: number
}

export interface AddCommentParams {
  commentContent: string
  type?: number
}

export interface Reply {
  avatar: string
  commentContent: string
  createTime: string
  id: number
  likeCount: number
  nickname: string
  parentId: number
  replyNickname: string
  replyUserId: number
  replyWebSite: string
  userId: number
  webSite: string
}

export interface Record {
  id: number
  userId: number
  nickname: string
  avatar: string
  webSite: string
  commentContent: string
  likeCount: number | null
  createTime: string
  replyCount: number | null
  parentId?: number
  replyNickname?: string
  replyUserId?: number
  replyWebSite?: string
  replyDTOList?: Record[] | null
}

export interface CommentList {
  count: number
  recordList: Record[]
}
