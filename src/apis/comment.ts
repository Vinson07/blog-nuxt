import type { CommentListParams, CommentList, Record, AddCommentParams } from '@/types/comment'
import type { HttpOption } from '@/composables/useHttp'

enum Api {
  list = '/comments',
  add = '/comments'
}

// 获取评论列表
export function getCommentList(params: CommentListParams, option?: HttpOption<CommentList>) {
  return useHttp.get<CommentList>(Api.list, params, option)
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
