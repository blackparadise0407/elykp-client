import { User } from '@/shared/interfaces';

import { request } from '../request';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

const AUTH_ENDPOINT = '/api/auth';

export const me = () => request<User>('GET', AUTH_ENDPOINT + '/me');

export const token = (refreshToken: string) =>
  request<TokenResponse>('POST', AUTH_ENDPOINT + '/token', {
    refreshToken,
  });
