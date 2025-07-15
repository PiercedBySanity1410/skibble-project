import React, {
  createContext,
  useReducer,
  useContext,
  type Dispatch,
  type ReactNode,
  useEffect,
} from "react";
import { reducer } from "./reducer";
import { type StateType, type ActionType } from "./types";
import SocketManager from "../SocketManager";
const StateContext = createContext<StateType | undefined>(undefined);
const DispatchContext = createContext<Dispatch<ActionType> | undefined>(
  undefined
);

interface StoreProviderProps {
  children: ReactNode;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const sessionUser = localStorage.getItem("sessionUser");

  if (!sessionUser) return null;

  const sessionUserJson = JSON.parse(sessionUser);

  // Ensure localStorage is initialized with chats
  const existingUserData = JSON.parse(
    localStorage.getItem(sessionUserJson.userId) || `{"chats":{}}`
  );

  const [state, dispatch] = useReducer(reducer, {
    ...sessionUserJson,
    chats: existingUserData.chats,
    currentChat: {
      userId: "",
      username: "---",
      avatarUrl: "",
      firstName: "--",
      lastName: "--",
      isOnline: false,
      isTyping: false,
      lastSeen: "",
    },
  });

  localStorage.setItem(
    sessionUserJson.userId,
    JSON.stringify(existingUserData)
  );
  SocketManager.init(sessionUserJson.accessToken);
  const socket = SocketManager.get();
  if (!socket) return null;
  useEffect(() => {
    socket.emit("chats:add", {
      accessToken: sessionUserJson.accessToken,
      list: Object.keys(existingUserData.chats),
    });
    socket.on("updateFromLog", (action: ActionType) => {
      dispatch(action);
    });
    return () => {
      socket.off("updateFromLog");
    };
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useStore = (): StateType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export const useDispatch = (): Dispatch<ActionType> => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a StoreProvider");
  }
  return context;
};
