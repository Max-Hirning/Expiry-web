import axios from 'axios';
import { env } from 'env';
import qs from 'qs';

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});
