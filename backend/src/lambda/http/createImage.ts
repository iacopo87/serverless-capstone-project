import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { CreateImageRequest } from "../../requests";
import { createImage } from "../../businessLogic/image";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";

const logger = createLogger("createImage");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event", event);

    const request: CreateImageRequest = JSON.parse(event.body);
    const userId = getUserId(event);

    const item = await createImage(userId, request);

    return {
      statusCode: 200,
      body: JSON.stringify({ item }),
    };
  }
);

handler.use(cors());
