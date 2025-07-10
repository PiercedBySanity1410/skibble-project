// chat interface
export interface ChatUser {
  id: string;
  username:string;
  avatar:string;
  firstName: string;
  lastName: string;
  isOnline: boolean;
}

// Define the state shape
export interface StateType {
  id:string;
  username: string;
  first: string;
  last: string;
  avatar: string;
  chats: { [key: string]: ChatUser };
  token:string;
}

export type ActionType = { type: "chat:update:add"; payload: ChatUser }; // Example for fetched count
