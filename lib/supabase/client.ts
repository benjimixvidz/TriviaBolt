import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config';
import type { Database } from './types';

// Create a singleton Supabase client
let supabase: ReturnType<typeof createClient<Database>>;

if (typeof window !== 'undefined') {
  supabase = supabase || createClient<Database>(
    env.supabase.url,
    env.supabase.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
} else {
  supabase = createClient<Database>(
    env.supabase.url,
    env.supabase.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
}

export { supabase };