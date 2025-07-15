export interface ChatUser {
  userId: string;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  isOnline: boolean;
  isTyping: string;
  lastSeen: string;
}
export interface StateType {
  userId: string;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  chats: { [key: string]: ChatUser };
  accessToken: string;
  currentChat: ChatUser;
}

export type ActionType =
  | { type: "currentChat:update"; chat: ChatUser }
  | { type: "chat:update:add"; chat: ChatUser }
  | {
      type: "chat:update:offline" | "chat:update:online";
      timestamp: string;
      userId: string;
    };
