// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import {
  createClient,
  SupabaseClient,
} from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
};

interface Noification{
  id: number;
  created: Date;
  type: string;
  title: string;
  child_id:string;
  parent_id: string;
  is_send:string;
  body:string;
  image:string;
}

async function createNotification(supabaseClient: SupabaseClient) {
  const { data: user, error } = await supabaseClient
    .from('notifications')
    .insert({ id: 1, name: 'Denmark' })
  if (error) throw error;

  return new Response(JSON.stringify({ user }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  });
}

serve(async (req) => {
  const { record } = await req.json();
  try {
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );
    //get submit details
    

    //make notification

    return createNotification(supabaseClient);
  } catch (error) {
    const data = {
      message: `notification creation failed:${error.message}`,
    };

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

