const AWS = require('aws-sdk');

AWS.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION,
})

/**
 * @description Publish to a SNS topic
 * @param {string} Message Message Payload
 */
module.exports.PublishToTopic = async (Message) => {

  let Response = {
    error: true,
    data: {},
  }
  
  const Params = {
    Message,
    TopicArn: process.env.SNS_TOPIC,
  };

  // If we have a `topic`, we request the publishing
  if (Params.TopicArn) {

    const PublishPromise = new AWS.SNS().publish(Params).promise();

    const PublishResponse = await PublishPromise.catch((err) => { console.error(err) });

    if (PublishResponse)
      Response = { data: { ...PublishResponse }, error: null };
  }

  return Response;
};
