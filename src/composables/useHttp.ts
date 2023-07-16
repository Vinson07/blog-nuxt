import type { FetchResponse, SearchParameters } from 'ofetch'
import type { UseFetchOptions } from '#app'
import { createDiscreteApi } from 'naive-ui'
// import { useUserStore } from '~/stores/user.store'
// import IconEmoticonDead from '~icons/mdi/emoticon-dead'

export interface ResOptions<T> {
  data: T
  code: number
  message: string
  flag: boolean
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export type HttpOption<T> = UseFetchOptions<ResOptions<T>>

const { message } = createDiscreteApi(['message'])

const baseURL = import.meta.env.VITE_APP_BASE_URL as string

function handleError<T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) {
  const err = (text: string) => {
    console.log(response?._data?.message ?? text)
    message.error(response?._data?.message ?? text)
  }
  if (!response._data) {
    err('請求超時，服務器無響應！')
    return
  }
  // const userStore = useUserStore()
  const handleMap: { [key: number]: () => void } = {
    404: () => err('服務器資源不存在'),
    500: () => err('服務器內部錯誤'),
    403: () => err('沒有權限訪問該資源'),
    401: () => {
      err('登錄狀態已過期，需要重新登錄')
      // userStore.clearUserInfo()
      // TODO 跳转实际登录页
      // navigateTo('/')
    }
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}
// get方法传递数组形式参数
function paramsSerializer(params?: SearchParameters) {
  if (!params) return

  const query = useCloneDeep(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}
function fetch<T>(url: UrlType, option: any) {
  return useFetch<ResOptions<T>>(url, {
    // 请求拦截器
    onRequest({ options }) {
      // get方法传递数组形式参数
      options.params = paramsSerializer(options.params)
      // 添加baseURL,从环境变量里面取
      options.baseURL = process.server ? baseURL : '/api'
      // options.baseURL = baseURL
      // 添加请求头,没登录不携带token
      // const userStore = useUserStore()
      // if (!userStore.isLogin) return
      options.headers = new Headers(options.headers)
      // options.headers.set('Authorization', `Bearer ${userStore.getToken}`)
    },
    // 响应拦截
    onResponse({ response }) {
      if (response.headers.get('content-disposition') && response.status === 200) return response
      // 在这里判断错误
      if (response._data.code !== 20000) {
        handleError<T>(response)
        return Promise.reject(response._data)
      }
      // 成功返回
      return response._data
    },
    // 错误处理
    onResponseError({ response }) {
      handleError<T>(response)
      return Promise.reject(response?._data ?? null)
    },
    // 合并参数
    ...option
  })
}

// 自动导出
export const useHttp = {
  get: <T>(url: UrlType, params?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'get', params, ...option })
  },

  post: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'post', body, ...option })
  },

  put: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'put', body, ...option })
  },

  delete: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'delete', body, ...option })
  }
}
