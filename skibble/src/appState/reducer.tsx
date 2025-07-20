import type { StateType, ActionType } from "./types";
export const reducer = (state: StateType, action: ActionType): StateType => {
  var existingUserData = JSON.parse(
    localStorage.getItem(state.userId) || `{"chats":{},"messages":{}}`
  );
  switch (action.type) {
    case "currentChat:update":
      console.log(action);
      return {
        ...state,
        currentChat: action.chat,
      };
    case "chat:update:add":
      existingUserData["chats"][action.chat.userId] = action.chat;
      existingUserData["messages"][action.chat.userId] = {};
      localStorage.setItem(state.userId, JSON.stringify(existingUserData));
      return {
        ...state,
        chats: { ...state.chats, [action.chat.userId]: action.chat },
      };
    case "chat:update:offline":
      if (state.chats[action.userId]) {
        existingUserData["chats"][action.userId]["lastSeen"] = action.timestamp;
        existingUserData["chats"][action.userId]["isOnline"] = false;
        localStorage.setItem(state.userId, JSON.stringify(existingUserData));
        return new Date(action.timestamp) >
          new Date(state.chats[action.userId].lastSeen)
          ? {
              ...state,
              chats: {
                ...state.chats,
                [action.userId]: {
                  ...state.chats[action.userId],
                  lastSeen: action.timestamp,
                  isOnline: false,
                },
              },
            }
          : state;
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
      if (state.chats[action.userId]) {
        existingUserData["chats"][action.userId]["lastSeen"] = action.timestamp;
        existingUserData["chats"][action.userId]["isOnline"] = true;
        localStorage.setItem(state.userId, JSON.stringify(existingUserData));
        return new Date(action.timestamp) >
          new Date(state.chats[action.userId].lastSeen)
          ? {
              ...state,
              chats: {
                ...state.chats,
                [action.userId]: {
                  ...state.chats[action.userId],
                  lastSeen: action.timestamp,
                  isOnline: true,
                },
              },
            }
          : state;
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
      if (!existingUserData["messages"][action.senderId])
        existingUserData["messages"][action.senderId] = {};
      existingUserData["messages"][action.senderId][action.messageId] =
        action.message;
      localStorage.setItem(state.userId, JSON.stringify(existingUserData));
      return state;
    default:
      return state;
  }
};
