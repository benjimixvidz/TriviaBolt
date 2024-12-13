// Server-side only environment configuration
const isValidValue = (value: string | undefined): value is string => {
  return typeof value === 'string' && value.length > 0;
};

export const serverEnv = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
} as const;

// Validate server environment variables
export function validateServerEnv() {
  if (!isValidValue(serverEnv.openai.apiKey)) {
    throw new Error('OPENAI_API_KEY is required');
  }
}