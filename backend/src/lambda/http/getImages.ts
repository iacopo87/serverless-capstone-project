import "source-map-support/register";
import { getAllImages } from "../../businessLogic/image";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";

const logger = createLogger("getImages");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event", event);

    const userId = getUserId(event);
    const items = await getAllImages(userId);

    return {
      statusCode: 200,
      body: JSON.stringify({ items }),
    };
  }
);

handler.use(cors());
