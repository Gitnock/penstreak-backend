// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
// import { Expo } from 'https://esm.sh/expo-server-sdk@3.7.0';
const expo_access_token = Deno.env.get("EXPO_ACCESS_TOKEN") || "";

console.log('Hello from Functions!, God enock');

/*
  push notification look:
  title: Homework Completed
  img: 
*/

serve((req: Request) => {
 
  // const expo = new Expo({ accessToken: expo_access_token });
  // Create the messages that you want to send to clients
  // let messages = [];
  // for (let pushToken of somePushTokens) {
  //   // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

  //   // Check that all your push tokens appear to be valid Expo push tokens
  //   if (!Expo.isExpoPushToken(pushToken)) {
  //     console.error(`Push token ${pushToken} is not a valid Expo push token`);
  //     continue;
  //   }

  //   // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
  //   messages.push({
  //     to: pushToken,
  //     sound: 'default',
  //     body: 'This is a test notification',
  //     data: { withSome: 'data' },
  //   });
  // }

  // let chunks = expo.chunkPushNotifications(messages);
  // let tickets = [];
  // (async () => {
  //   // Send the chunks to the Expo push notification service. There are
  //   // different strategies you could use. A simple one is to send one chunk at a
  //   // time, which nicely spreads the load out over time:
  //   for (let chunk of chunks) {
  //     try {
  //       let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
  //       console.log(ticketChunk);
  //       tickets.push(...ticketChunk);
  //       // NOTE: If a ticket contains an error code in ticket.details.error, you
  //       // must handle it appropriately. The error codes are listed in the Expo
  //       // documentation:
  //       // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // })();

  const data = {
    message: `notifications sent ${expo_access_token}`,
  };

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
