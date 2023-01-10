// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
// import { Expo } from "https://esm.sh/expo-server-sdk@3.7.0?target=deno&no-check";
// import { Expo } from 'https://esm.sh/expo-server-sdk@3.7.0?target=deno&no-check';

import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";

const expo_access_token = Deno.env.get('EXPO_ACCESS_TOKEN') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
};

console.log('Hello from Functions!, God enock');

/*
  push notification look:
  title: Homework Completed
  img: 
*/

async function getPushToken(supabaseClient: SupabaseClient, parentId: string) {
  //get user pushtoken

  const { data: user, error } = await supabaseClient
    .from('users')
    .select('push_id')
    .eq('uid', parentId).single();
  if (error) throw error;
  return user;
}

serve(async (req: Request) => {
  const { record } = await req.json();
  // const expo = new Expo({ accessToken: expo_access_token });
  // Create the messages that you want to send to clients
  // const sendPushNotification =  (expoPushToken: string) => {
  //   // Check that all your push tokens appear to be valid Expo push tokens
  //   if (!Expo.isExpoPushToken(expoPushToken)) {
  //     console.error(`expo-push-token is not a valid Expo push token`);
  //   }
  //   const messages = [];
  //   const message = {
  //     to: expoPushToken,
  //     data: { extraData: 'Some data' },
  //     title: 'Hi Enock, Sent by backend server',
  //     body: 'This push notification was sent by a backend server!',
  //   };
  //   messages.push(message);
  //   const chunks = expo.chunkPushNotifications(messages);
  //   const tickets = [];

  //   try {
  //     (async () => {
  //       for (const chunk of chunks) {
  //         try {
  //           const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
  //           tickets.push(...ticketChunk);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     })();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'THIS IS TITLE',
      body: 'YO ENOCK, whats up',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  

  

  try {
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      },
    );
    
    const {push_id} = await getPushToken(supabaseClient,record.parent_id);
    await sendPushNotification(push_id)

    const data = {
      message: `sent: ${record.parent_id}`,
    };
    console.log(data);
    return  new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const data = {
      message: `message failed:${error.message}`,
    };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders,'Content-Type': 'application/json' },
    });
  }
});

