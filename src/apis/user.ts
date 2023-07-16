import type {
  IUserInfo,
  IChangePasswordParams,
  IRegisterParams,
  IUpdateUserInfoParams
} from '@/types/user'
// import type { HttpOption } from '@/composables/useHttp'

enum Api {
  login = '/login',
  code = '/users/code',
  password = '/users/password',
  register = '/register',
  info = '/users/info',
  avatar = '/users/avatar'
}

// 登录
export function login(data: FormData) {
  return useHttp.post<IUserInfo>(Api.login, data)
}

// 发送邮箱验证码
export function sendCode(username: string) {
  return useHttp.get(Api.code, { username })
}

// 修改密码
export function changePassword(data: IChangePasswordParams) {
  return useHttp.put(Api.password, data)
}

// 用户注册
export function register(data: IRegisterParams) {
  return useHttp.post(Api.register, data)
}

// 更新用户信息
export function updateUserInfo(data: IUpdateUserInfoParams) {
  return useHttp.put(Api.info, data)
}

// 更新用户头像
export function updateAvatar(data: FormData) {
  return useHttp.post<string>(Api.avatar, data)
}
