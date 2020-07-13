require('dotenv').config();
const { PublishToTopic } = require('./integrations/sns');


(async () => {

  let Payload = 'Sending Urgent Test Message to a SNS topic!!'; 
  const MessageResponse = await PublishToTopic(Payload);

  if (!MessageResponse || MessageResponse.error)
    console.error(`> Error At Publishing:`, MessageResponse);
  else
    console.log(`> Publish Successful:`, MessageResponse);
})();
