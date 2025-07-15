import type { StateType, ActionType } from "./types";

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "currentChat:update":
      return {
        ...state,
        currentChat: action.chat,
      };
    case "chat:update:add":
      return {
        ...state,
        chats: { ...state.chats, [action.chat.userId]: action.chat },
      };
    case "chat:update:offline":
      if (state.currentChat.userId === action.userId) {
        return {
          ...state,
          currentChat: {
            ...state.currentChat,
            lastSeen: action.timestamp,
            isOnline: false,
          },
        };
      }
      return state;
    case "chat:update:online":
      if (state.currentChat.userId === action.userId) {
        return {
          ...state,
          currentChat: {
            ...state.currentChat,
            lastSeen: action.timestamp,
            isOnline: true,
          },
        };
      }
      return state;
    default:
      return state;
  }
};
