import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';
import type { Database } from './types';

// Create a Supabase client with the service role key for server-side operations
export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);