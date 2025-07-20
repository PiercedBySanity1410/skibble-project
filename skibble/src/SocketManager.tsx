import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: Socket | null = null;

  static init(): Socket {
    if (!this.instance) {
      this.instance = io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["websocket"],
      });
    }
    return this.instance;
  }

  static get(): Socket | null {
    return this.instance;
  }

  static disconnect(accessToken: string): void {
    if (this.instance) {
      this.instance.emit("chat:offline", { accessToken });
    }
  }
}

export default SocketManager;
