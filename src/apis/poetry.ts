export interface Poetry {
  content: string
  origin: string
  author: string
  category: string
}

// 获取诗词
export function getPoetry() {
  return useLazyFetch<Poetry>('https://v1.jinrishici.com/all.json')
}

// 一言
export function getYiYan() {
  return useLazyFetch('https://v.api.aa1.cn/api/yiyan/index.php?type=json')
}
