import { env } from 'env';
import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }

  return socketInstance;
};

export const socket = new Proxy({} as Socket, {
  get(_, prop: keyof Socket) {
    return getSocket()[prop];
  },
});
