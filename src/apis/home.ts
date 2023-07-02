import { http } from './request'
import { BlogInfo } from '@/types'

// 获取博客基本信息
export function getBlogInfo() {
  return http.get<BlogInfo>('/api/')
}
