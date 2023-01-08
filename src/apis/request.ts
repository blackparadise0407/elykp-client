import type {
  AxiosError,
  AxiosRequestConfig,
  GenericAbortSignal,
  Method,
} from 'axios';
import axios from 'axios';
import qs from 'query-string';

import { getAccessToken, getRefreshToken } from '@/contexts/AuthContext';
import { config } from '@/shared/constants/config';
import { OIDC_SKEY } from '@/shared/constants/constants';

import { authApi } from './_apis';

export interface RequestFn<T> {
  (signal: GenericAbortSignal, ...args: any[]): ReturnType<typeof request<T>>;
}

let prevReq: AxiosRequestConfig & { retry?: boolean } = {};

const httpClient = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (p) =>
      qs.stringify(p, { skipNull: true, skipEmptyString: true }),
  },
});

httpClient.interceptors.request.use(async (reqConfig) => {
  const accessToken = getAccessToken();
  if (accessToken && reqConfig.headers) {
    reqConfig.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  if (!reqConfig.url?.includes('/api/auth/token')) {
    prevReq = reqConfig;
  }

  return reqConfig;
});

httpClient.interceptors.response.use(
  (response) => response.data ?? response,
  async (e: AxiosError) => {
    const accessToken = getAccessToken();
    const oldRefreshToken = getRefreshToken();
    if (e.response?.status === 401) {
      if (!prevReq.retry && accessToken && oldRefreshToken) {
        const tokenResp = await authApi.token(oldRefreshToken);
        window.sessionStorage.setItem(
          OIDC_SKEY,
          JSON.stringify({
            id_token: tokenResp.accessToken,
            refresh_token: tokenResp.refreshToken,
            user_id: tokenResp.userId,
          }),
        );
        prevReq.retry = true;
        return Promise.resolve(httpClient.request(prevReq));
      }
    }

    throw e;
  },
);

export function request<T>(method: Method, url: string, data?: unknown) {
  const config: AxiosRequestConfig = {
    method,
    url,
  };

  if (method.toLowerCase() === 'get') {
    config.params = data;
  } else config.data = data;

  return httpClient.request(config) as Promise<T>;
}
