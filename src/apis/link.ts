import { http } from './request'
import type { Link } from '@/types/link'

export function getLink() {
  return http.get<Link[]>('/api/links')
}
