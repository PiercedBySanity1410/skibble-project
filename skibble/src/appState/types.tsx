export interface ChatUser {
  userId: string;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  isOnline: boolean;
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
}

export type ActionType = { type: "chat:update:add"; payload: ChatUser }; // Example for fetched count
