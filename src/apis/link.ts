import type { Link } from '@/types/link'
import type { HttpOption } from '@/composables/useHttp'

enum Api {
  link = '/friend/list'
}

export function getLinkList(option?: HttpOption<Link[]>) {
  return useHttp.get<Link[]>(Api.link, option)
}
