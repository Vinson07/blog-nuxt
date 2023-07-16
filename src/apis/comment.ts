import type { CommentListParams, CommentList, Record, AddCommentParams } from '@/types/comment'
// import type { HttpOption } from '@/composables/useHttp'

interface List {
  code: number
  data: CommentList
  flag: boolean
  message: string
}

enum Api {
  list = '/api/comments',
  add = '/comments'
}

// 获取评论列表
export function getCommentList(params: CommentListParams) {
  // useHttp 有毒，刷新页面请求不到数据，其他接口又不会
  // return useHttp.get<CommentList>(Api.list, params)
  return $fetch<List>(Api.list, { params })
}

// 获取评论下的回复
export function getReplies(commentId: number) {
  return useHttp.get<Record[]>(`/comments/${commentId}/replies`)
}

// 添加评论
export function addComment(data: AddCommentParams) {
  return useHttp.post(Api.add, data)
}

// 评论点赞
export function commentLike(commentId: number) {
  return useHttp.post(`/comments/${commentId}/like`)
}
