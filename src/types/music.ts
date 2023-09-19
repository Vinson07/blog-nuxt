export interface PlayListParams {
  type: string
  id: string
}

export interface PlayList {
  artist: string
  // 歌词
  lrc: string
  name: string
  // 封面图
  pic: string
  // 音乐链接
  url: string
}
