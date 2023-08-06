import type { CommentQuery, Comment, Reply, CommentForm } from '@/types/comment'
import type { PageResult, PageQuery } from '@/types'
import type { HttpOption } from '@/composables/useHttp'

enum Api {
  list = '/comment/list',
  add = '/comment/add'
}

/**
 * 查看评论列表
 * @returns 评论列表
 */
export function getCommentList(params: CommentQuery, option?: HttpOption<PageResult<Comment[]>>) {
  return useHttp.get<PageResult<Comment[]>>(Api.list, params, option)
}

/**
 * 查看回复评论
 * @param commentId 评论id
 * @param params 分页参数
 * @returns 回复评论列表
 */
export function getReplyList(commentId: number, params?: PageQuery, option?: HttpOption<Reply[]>) {
  return useHttp.get<Reply[]>(`/comment/${commentId}/reply`, params, option)
}

/**
 * 添加评论
 */
export function addComment(data: CommentForm) {
  return useHttp.post<null>(Api.add, data)
}

/**
 * 点赞评论
 * @param commentId 评论id
 */
export function likeComment(commentId: number) {
  return useHttp.post<null>(`/comment/${commentId}/like`)
}
