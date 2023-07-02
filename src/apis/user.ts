import { http } from './request'
import type {
  IUserInfo,
  IChangePasswordParams,
  IRegisterParams,
  IUpdateUserInfoParams
} from '@/types/user'

// 登录
export function login(data: FormData) {
  return http.post<IUserInfo>('/api/login', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 发送邮箱验证码
export function sendCode(username: string) {
  return http.get('/api/users/code', { params: { username } })
}

// 修改密码
export function changePassword(data: IChangePasswordParams) {
  return http.put('/api/users/password', data)
}

// 用户注册
export function register(data: IRegisterParams) {
  return http.post('/api/register', data)
}

// 更新用户信息
export function updateUserInfo(data: IUpdateUserInfoParams) {
  return http.put('/api/users/info', data)
}

// 更新用户头像
export function updateAvatar(data: FormData) {
  return http.post('/api/users/avatar', data)
}
