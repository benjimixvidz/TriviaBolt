// Common environment configuration
const isValidValue = (value: string | undefined): value is string => {
  return typeof value === 'string' && value.length > 0;
};

// Client-side environment variables
export const clientEnv = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
} as const;

// Server-side environment variables
export const serverEnv = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
} as const;

// Validate environment variables
export function validateEnv() {
  if (!isValidValue(clientEnv.supabase.url)) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!isValidValue(clientEnv.supabase.anonKey)) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  if (!isValidValue(serverEnv.openai.apiKey)) {
    throw new Error('Missing OPENAI_API_KEY');
  }
}