import { CloudWatchLogsEvent, CloudWatchLogsDecodedData } from "aws-lambda";
import "source-map-support/register";
import * as elasticsearch from "elasticsearch";
import * as httpAwsEs from "http-aws-es";
import { gunzip } from "zlib";
import { createLogger } from "../../utils/logger";

const logger = createLogger("elasticSearchSync");

const esHost = process.env.ES_ENDPOINT;
const es = new elasticsearch.Client({
  hosts: [esHost],
  connectionClass: httpAwsEs,
});

export const handler = async (event: CloudWatchLogsEvent) => {
  logger.info("Processing logs from CloudWatch", event);

  var payload = new Buffer(event.awslogs.data, "base64");
  let logData: CloudWatchLogsDecodedData = await new Promise(
    (resolve, reject) => {
      gunzip(payload, function (e, result) {
        if (e) {
          reject("Error decoding logs");
        } else {
          resolve(JSON.parse(result.toString()));
        }
      });
    }
  );

  logger.info("log data", logData);

  for (const event of logData.logEvents) {
    await es.index({
      index: "application-index",
      type: "application-log",
      id: event.id,
      body: event,
    });
  }
};
