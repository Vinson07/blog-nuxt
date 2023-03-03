import http from './request'
import { PostList } from '@/types/article'

export function getPostList() {
  return http.get<PostList[]>('/api/articles')
}
