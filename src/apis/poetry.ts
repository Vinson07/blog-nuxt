import type { Poetry, IHitokoto } from '@/types/poetry'

// 获取诗词
export function getPoetry() {
  return useFetch<Poetry>('https://v1.jinrishici.com/all.json', { lazy: true })
}

// 一言
export function getYiYan() {
  return useFetch('https://v.api.aa1.cn/api/yiyan/index.php?type=json', { lazy: true })
}

export function getYiYan2() {
  return useFetch<IHitokoto>('https://v1.hitokoto.cn/?encode=json&c=d&c=j&c=k&c=k&c=i&lang=cn', {
    lazy: true
  })
}
