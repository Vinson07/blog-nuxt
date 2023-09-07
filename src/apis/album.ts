import type { HttpOption } from '@/composables/useHttp'
import type { Album, PhotoInfo } from '@/types/album'

enum Api {
  albumList = '/album/list',
  photoList = '/photo/list'
}

/**
 * 查看相册列表
 * @returns 相册列表
 */
export function getAlbumList() {
  return useHttp.get<Album[]>(Api.albumList)
}

/**
 * 查看照片列表
 * @param albumId 相册id
 * @returns 照片列表
 */
export function getPhotoList(albumId: number, option?: HttpOption<PhotoInfo>) {
  return useHttp.get<PhotoInfo>(Api.photoList, { albumId }, option)
}
