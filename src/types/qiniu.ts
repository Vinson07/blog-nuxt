export interface ImageListParams {
  marker: string
  prefix: string
}

export interface FileParams {
  file: FormData
}

export interface List {
  fsize: number
  hash: string
  key: string
  md5: string
  mimeType: string
  putTime: number
  status: number
  type: number
}

export interface ImageList {
  list: List[]
  marker: string
}
