import axios from 'axios'

// 获取诗词
export function getPoetry() {
  return axios.get('https://v1.jinrishici.com/all.json')
}
