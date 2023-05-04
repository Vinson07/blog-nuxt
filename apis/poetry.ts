import axios from 'axios'

// 获取诗词
export function getPoetry() {
  return axios.get('https://v1.jinrishici.com/all.json')
}

export function getYiYan() {
  return axios.get('https://v.api.aa1.cn/api/yiyan/index.php?type=json')
}
