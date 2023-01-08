import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/apis';

import { authKeys } from './queryKeyFactory';

export const useAuthQuery = () =>
  useQuery(authKeys.me, authApi.me, {
    refetchOnWindowFocus: false,
  });
