import { qiniuHttp } from './request'
import type { ImageListParams, FileParams, ImageList } from '@/types/qiniu'

// 获取图片
export function getQiniuImg(data: ImageListParams) {
  return qiniuHttp.get<ImageList>('/qiniuApi/get-file-list', { params: data })
}

// 上传图片
export function uploadImg(data: FileParams) {
  return qiniuHttp.post('/qiniuApi/upload-img', data)
}
