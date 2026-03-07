import { AxiosError } from 'axios';

import '@tanstack/react-query';

import { IError } from './error';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<IError>;
  }
}
