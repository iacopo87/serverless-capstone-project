import { apiEndpoint } from '../config'
import { ImageItem } from '../types/ImageItem'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'
import { CommentItem } from '../types/CommentItem'

export async function getImages(idToken: string): Promise<ImageItem[]> {
  console.log('Fetching images')
  const response = await fetch(`${apiEndpoint}/images`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  const result = await response.json()

  return result.items.sort((first: ImageItem, second: ImageItem) =>
    first.createdAt < second.createdAt ? 1 : -1
  )
}

export async function createImage(
  idToken: string,
  newImage: ImageUploadInfo
): Promise<ImageUploadResponse> {
  const reply = await fetch(`${apiEndpoint}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({
      title: newImage.title
    })
  })

  return await reply.json()
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}

export async function deleteImage(
  idToken: string,
  imageId: string
): Promise<void> {
  await fetch(`${apiEndpoint}/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function createComment(
  idToken: string,
  imageId: string,
  text: string
): Promise<CommentItem> {
  const reply = await fetch(`${apiEndpoint}/images/${imageId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ text })
  })

  return await reply.json()
}
