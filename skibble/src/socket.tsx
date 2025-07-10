import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export const getSocket = (token: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_BASE_URL, {
      query: {
        token,
      },
    });
  }
  return socket;
};