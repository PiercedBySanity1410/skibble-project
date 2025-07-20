import type { StateType, ActionType } from "./types";

export const reducer = (state: StateType, action: ActionType): StateType => {
  const getUserData = () =>
    JSON.parse(
      localStorage.getItem(state.userId) || `{"chats":{},"messages":{}}`
    );

  switch (action.type) {
    case "currentChat:update":
      return {
        ...state,
        currentChat: action.chat,
      };

    case "chat:update:add": {
      const existingUserData = getUserData();
      existingUserData.chats[action.chat.userId] = action.chat;
      existingUserData.messages[action.chat.userId] = {};
      localStorage.setItem(state.userId, JSON.stringify(existingUserData));
      return {
        ...state,
        chats: { ...state.chats, [action.chat.userId]: action.chat },
      };
    }

    case "chat:update:offline": {
      const existingUserData = getUserData();
      if (state.chats[action.userId]) {
        existingUserData.chats[action.userId].lastSeen = action.timestamp;
        existingUserData.chats[action.userId].isOnline = false;
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
    }

    case "chat:update:online": {
      const existingUserData = getUserData();
      if (state.chats[action.userId]) {
        existingUserData.chats[action.userId].lastSeen = action.timestamp;
        existingUserData.chats[action.userId].isOnline = true;
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
    }

    case "chat:message:sender": {
      const existingUserData = getUserData();
      if (!existingUserData.messages[action.senderId]) {
        existingUserData.messages[action.senderId] = {};
      }
      existingUserData.messages[action.senderId][action.messageId] =
        action.message;

      let newState = state;
      if (action.senderInfo && !state.chats[action.senderId]) {
        existingUserData.chats[action.senderInfo.userId] = action.senderInfo;
        newState = {
          ...state,
          chats: {
            ...state.chats,
            [action.senderInfo.userId]: action.senderInfo,
          },
        };
      }
      localStorage.setItem(state.userId, JSON.stringify(existingUserData));
      return newState;
    }

    default:
      return state;
  }
};
