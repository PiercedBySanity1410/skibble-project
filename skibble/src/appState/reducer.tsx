import type { StateType, ActionType } from "./types";

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "currentChat:update":
      return {
        ...state,
        currentChat: action.chat,
      };
    case "chat:update:add":
      var existingUserData = JSON.parse(
        localStorage.getItem(state.userId) || `{"chats":{},"messages":{}}`
      );
      existingUserData["chats"][action.chat.userId] = action.chat;
      existingUserData["messages"][action.chat.userId] = {};
      localStorage.setItem(state.userId, JSON.stringify(existingUserData));
      return {
        ...state,
        chats: { ...state.chats, [action.chat.userId]: action.chat },
      };
    case "chat:update:offline":
      if (
        state.chats[action.userId] &&
        new Date(action.timestamp) >
          new Date(state.chats[action.userId].lastSeen)
      ) {
        return {
          ...state,
          chats: {
            [action.userId]: {
              ...state.chats[action.userId],
              lastSeen: action.timestamp,
              isOnline: false,
            },
          },
        };
      }
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          lastSeen: action.timestamp,
          isOnline: false,
        },
      };
    case "chat:update:online":
      if (
        state.chats[action.userId] &&
        new Date(action.timestamp) >
          new Date(state.chats[action.userId].lastSeen)
      ) {
        return {
          ...state,
          chats: {
            [action.userId]: {
              ...state.chats[action.userId],
              lastSeen: action.timestamp,
              isOnline: true,
            },
          },
        };
      }
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          lastSeen: action.timestamp,
          isOnline: true,
        },
      };
    case "chat:message:sender":
      var existingUserData = JSON.parse(
        localStorage.getItem(state.userId) || `{"chats":{},"messages":{}}`
      );
      if(!existingUserData["messages"][action.senderId]) existingUserData["messages"][action.senderId]={};
      existingUserData["messages"][action.senderId][action.messageId] = action.message;
      localStorage.setItem(state.userId, JSON.stringify(existingUserData));
      return state;
    default:
      return state;
  }
};
