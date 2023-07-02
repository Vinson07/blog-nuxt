import { http } from './request'
import type { BarrageList, AddBarrageParams } from '@/types/barrage'

// 获取弹幕
export function getBarrage() {
  return http.get<BarrageList[]>('/api/messages')
}

// 添加弹幕
export function addBarrage(data: AddBarrageParams) {
  return http.post<BarrageList>('/api/messages', data)
}
