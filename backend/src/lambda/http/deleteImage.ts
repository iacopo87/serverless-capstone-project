import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { deleteImage } from "../../businessLogic/image";
import { createLogger } from "../../utils/logger";

const logger = createLogger("deleteImage");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event", event);
    const imageId = event.pathParameters.imageId;

    await deleteImage(imageId);

    return {
      statusCode: 200,
      body: "",
    };
  }
);

handler.use(cors());
