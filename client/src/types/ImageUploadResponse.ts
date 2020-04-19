import { ImageItem } from './ImageItem'

export interface ImageUploadResponse {
  item: { newItem: ImageItem; uploadUrl: string }
}
