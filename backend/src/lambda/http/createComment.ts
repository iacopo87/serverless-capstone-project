import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { createComment } from "../../businessLogic/image";
import { createLogger } from "../../utils/logger";

const logger = createLogger("updateTodo");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event", event);

    const imageId = event.pathParameters.imageId;
    const comment = JSON.parse(event.body);
    const newComment = await createComment(comment, imageId);

    return {
      statusCode: 200,
      body: JSON.stringify(newComment),
    };
  }
);

handler.use(cors());
