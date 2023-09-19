import type { PlayListParams, PlayList } from '@/types/music'

enum Api {
  playList = 'https://api.injahow.cn/meting'
}

export function getPlayList(params: PlayListParams) {
  return useFetch<PlayList[]>(Api.playList, { params, lazy: true })
}
