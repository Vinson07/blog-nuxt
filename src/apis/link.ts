import type { Link } from '@/types/link'

enum Api {
  link = '/links'
}

export function getLink() {
  return useHttp.get<Link[]>(Api.link)
}
