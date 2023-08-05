import type { Link } from '@/types/link'

enum Api {
  link = '/friend/list'
}

export function getLinkList() {
  return useHttp.get<Link[]>(Api.link)
}
