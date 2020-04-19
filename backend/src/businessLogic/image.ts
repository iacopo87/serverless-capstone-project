import { ImageItem, CommentItem } from "../models/index";
import { CreateImageRequest, CreateCommentRequest } from "../requests/index";
import { makeStorageAccess, makeDBAccess } from "../dataLayer/index";
import { createLogger } from "../utils/logger";
import * as uuid from "uuid";

interface CreateImageResponse {
  newItem: ImageItem;
  uploadUrl: string;
}

const logger = createLogger("businessLogic");
const storageAccess = makeStorageAccess();
const dbAccess = makeDBAccess();

export async function getAllImages(userId: string): Promise<ImageItem[]> {
  logger.info("getAllImages");

  let images = await dbAccess.getAllImages();

  const imagesWithComments = await Promise.all(
    images.map(async (image) => ({
      ...image,
      isCurrentUser: image.userId === userId,
      comments: await dbAccess.getComments(image.imageId),
    }))
  );

  return imagesWithComments as ImageItem[];
}

export async function createImage(
  userId: string,
  request: CreateImageRequest
): Promise<CreateImageResponse> {
  logger.info("Create Image", userId, request);
  const imageId = uuid.v4();
  const createdAt = new Date().toISOString();
  const imageUrl = storageAccess.getImageUrl(imageId);

  const newItem = {
    imageId,
    userId,
    createdAt,
    imageUrl,
    ...request,
  };
  await dbAccess.createImage(newItem);
  const uploadUrl = storageAccess.getUploadUrl(imageId);

  return Promise.resolve({ newItem, uploadUrl });
}

export async function createComment(
  request: CreateCommentRequest,
  imageId: string
): Promise<CommentItem> {
  logger.info("createComment", request);
  const commentId = uuid.v4();
  const createdAt = new Date().toISOString();

  const newItem = {
    commentId,
    createdAt,
    imageId,
    ...request,
  };

  return dbAccess.createComment(newItem);
}

export async function deleteImage(imageId: string) {
  logger.info("deleteImage", imageId);

  return dbAccess.deleteImage(imageId);
}
