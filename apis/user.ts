import { http } from './request'
import type { IUserInfo } from '@/types/user'

export function login(data: FormData) {
  return http.post<IUserInfo>('/api/login', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
