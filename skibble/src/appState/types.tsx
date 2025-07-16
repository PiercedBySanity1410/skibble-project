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
export type Message = {
  content: string;
  contentType: "text" | "image" | "video" | "audio" | "file";
  timestamp: string;
  deliveryStatus: "sent" | "delivered" | "read" | "failed" | "pending";
};
export type ActionType =
  | { type: "currentChat:update"; chat: ChatUser }
  | { type: "chat:update:add"; chat: ChatUser }
  | {
      type: "chat:update:offline" | "chat:update:online";
      timestamp: string;
      userId: string;
    }
  | {
      type: "chat:message:sender" | "chat:message:receiver";
      messageId: string;
      senderId: string;
      receiverId: string;
      message: Message;
    };
