import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { ImageItem, CommentItem } from "../models/index";
import { createLogger } from "../utils/logger";

const logger = createLogger("DBAccess");
const XAWS = AWSXRay.captureAWS(AWS);

export function makeDBAccess(
  documentClient = new XAWS.DynamoDB.DocumentClient(),
  imageTable = process.env.IMAGE_TABLE,
  commentTable = process.env.COMMENTS_TABLE,
  imageIdIndex = process.env.IMAGE_ID_INDEX
) {
  const getAllImages = async function (): Promise<ImageItem[]> {
    logger.info("getAllImages");

    const images = await documentClient
      .scan({
        TableName: imageTable,
        ScanIndexForward: false,
      })
      .promise();

    return (images.Items || []) as ImageItem[];
  };

  const getComments = async function (imageId: String): Promise<CommentItem[]> {
    logger.info("getComments", imageId);

    let comments = await documentClient
      .query({
        TableName: commentTable,
        IndexName: imageIdIndex,
        KeyConditionExpression: "imageId = :imageId",
        ExpressionAttributeValues: {
          ":imageId": imageId,
        },
        ScanIndexForward: false,
      })
      .promise();

    logger.info("getComments result", comments);
    return (comments.Items || []) as CommentItem[];
  };

  const createImage = async function (item: ImageItem): Promise<ImageItem> {
    logger.info("createImage", item);

    await documentClient
      .put({
        TableName: imageTable,
        Item: item,
      })
      .promise();

    return item;
  };

  const createComment = async function (
    item: CommentItem
  ): Promise<CommentItem> {
    logger.info("createComment", item);

    await documentClient
      .put({
        TableName: commentTable,
        Item: item,
      })
      .promise();

    return item;
  };

  const deleteImage = async function (imageId: String): Promise<void> {
    logger.info("deleteImage", imageId);

    let queryResult = await documentClient
      .query({
        TableName: imageTable,
        KeyConditionExpression: "imageId = :imageId",
        ExpressionAttributeValues: {
          ":imageId": imageId,
        },
      })
      .promise();
    logger.info("deleteImage. Retrieved item", queryResult);

    await documentClient
      .delete({
        TableName: imageTable,
        Key: { imageId, createdAt: queryResult.Items[0].createdAt },
      })
      .promise();
  };

  return {
    getAllImages,
    getComments,
    deleteImage,
    createImage,
    createComment,
  };
}
