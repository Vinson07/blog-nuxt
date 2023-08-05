import type { IChangePasswordParams, LoginForm, UserInfo, UserForm } from '@/types/user'
import type { HttpOption } from '@/composables/useHttp'

enum Api {
  login = '/login',
  code = '/code',
  password = '/users/password',
  register = '/register',
  userInfo = '/user/getUserInfo',
  avatar = '/users/avatar'
}

/**
 * 用户登录
 * @param data 登录信息
 * @returns Token
 */
export function login(data: LoginForm, option?: HttpOption<string>) {
  return useHttp.post<string>(Api.login, data, option)
}

/**
 * 邮箱注册
 * @param data 注册信息
 */
export function register(data: UserForm, option?: HttpOption<null>) {
  return useHttp.post<null>(Api.register, data, option)
}

/**
 * 发送邮箱验证码
 * @param params 邮箱
 */
export function getCode(username: string) {
  return useHttp.get<null>(Api.code, { username })
}

// 修改密码
export function changePassword(data: IChangePasswordParams) {
  return useHttp.put(Api.password, data)
}

/**
 * 获取登录用户信息
 * @returns 登录用户信息
 */
export function getUserInfo() {
  return useHttp.get<UserInfo>(Api.userInfo)
}

// 更新用户信息
// export function updateUserInfo(data: IUpdateUserInfoParams) {
//   return useHttp.put(Api.info, data)
// }

// 更新用户头像
export function updateAvatar(data: FormData) {
  return useHttp.post<string>(Api.avatar, data)
}
