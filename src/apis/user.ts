import type { LoginForm, UserInfo, UserForm, UserInfoForm, EmailForm } from '@/types/user'
import type { HttpOption } from '@/composables/useHttp'

enum Api {
  login = '/login',
  code = '/code',
  password = '/user/password',
  register = '/register',
  userInfo = '/user/getUserInfo',
  updateUserInfo = '/user/info',
  updateAvatar = '/user/avatar',
  updateEmail = '/user/email'
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

/**
 * 修改用户密码
 * @param data 用户密码
 */
export function changePassword(data: UserForm) {
  return useHttp.put<null>(Api.password, data)
}

/**
 * 获取登录用户信息
 * @returns 登录用户信息
 */
export function getUserInfo() {
  return useHttp.get<UserInfo>(Api.userInfo)
}

/**
 * 修改用户信息
 * @param data 用户信息
 */
export function updateUserInfo(data: UserInfoForm) {
  return useHttp.put<null>(Api.updateUserInfo, data)
}

/**
 * 修改用户邮箱
 * @param data 用户邮箱
 */
export function updateUserEmail(data: EmailForm) {
  return useHttp.put<null>(Api.updateEmail, data)
}

/**
 * 修改用户头像
 * @param data 头像
 */
export function updateAvatar(data: FormData) {
  return useHttp.post<string>(Api.updateAvatar, data)
}
