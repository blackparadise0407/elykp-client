export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  },
} as const;
