import type { BarrageList, AddBarrageParams } from '@/types/barrage'
import type { HttpOption } from '@/composables/useHttp'

enum Api {
  barrage = '/messages',
  add = '/messages'
}

// 获取弹幕
export function getBarrage(option?: HttpOption<BarrageList[]>) {
  return useHttp.get<BarrageList[]>(Api.barrage, {}, option)
}

// 添加弹幕
export function addBarrage(data: AddBarrageParams) {
  return useHttp.post<BarrageList>(Api.add, data)
}
