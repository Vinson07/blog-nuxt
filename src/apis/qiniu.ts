import type { ImageListParams, FileParams, ImageList } from '@/types/qiniu'

type ImageData = {
  code: number
  data: ImageList
  msg: string
}

// 获取图片
export function getQiniuImg(params: ImageListParams) {
  return $fetch<ImageData>('/qiniuApi/get-file-list', { params })
}

// 上传图片
export function uploadImg(data: FileParams) {
  return useFetch('/qiniuApi/upload-img', {
    method: 'post',
    body: data
  })
}
