const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    // En développement, afficher un avertissement au lieu de bloquer
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Warning: ${key} is not set`);
      return 'development';
    }
    throw new Error(`${key} is not set`);
  }
  return value;
};

export const env = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY'),
  },
} as const;
