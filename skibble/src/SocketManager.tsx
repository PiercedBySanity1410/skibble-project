import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: Socket | null = null;

  static init(accessToken: string): Socket {
    if (!this.instance) {
      this.instance = io(import.meta.env.VITE_API_BASE_URL, {
        query: { accessToken },
      });
    }
    return this.instance;
  }

  static get(): Socket | null {
    return this.instance;
  }

  static disconnect(): void {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
    }
  }
}

export default SocketManager;
