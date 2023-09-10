import type { PageQuery, PageResult } from '@/types'
import type { Talk } from '@/types/talk'

enum Api {
  talkList = '/talk/list'
}

/**
 * 查看说说列表
 * @param params 查询条件
 * @returns 说说列表
 */
export function getTalkList(params: PageQuery) {
  return useHttp.get<PageResult<Talk[]>>(Api.talkList, params)
}

/**
 * 点赞说说
 * @param talkId 说说id
 */
export function likeTalk(talkId: number) {
  return useHttp.post<null>(`/talk/${talkId}/like`)
}
