import type { HttpOption } from '@/composables/useHttp'
import { BlogInfo } from '@/types/home'

// 获取博客基本信息
export function getBlogInfo(option?: HttpOption<BlogInfo>) {
  return useHttp.get<BlogInfo>('/', {}, option)
}
