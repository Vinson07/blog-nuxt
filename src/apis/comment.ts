import { http } from './request'
import type { CommentListParams, CommentList, Record, AddCommentParams } from '@/types/comment'

// 获取评论列表
export function getCommentList(params: CommentListParams) {
  return http.get<CommentList>('/api/comments', { params })
}

// 获取评论下的回复
export function getReplies(commentId: number) {
  return http.get<Record[]>(`/api/comments/${commentId}/replies`)
}

// 添加评论
export function addComment(data: AddCommentParams) {
  return http.post('/api/comments', data)
}
