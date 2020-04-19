import { CommentItem } from "./index";

export interface ImageItem {
  userId: string;
  imageId: string;
  createdAt: string;
  title: string;
  imageUrl: string;
  isCurrentUser?: boolean;
  comments?: [CommentItem];
}
