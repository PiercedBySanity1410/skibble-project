import React, {
  createContext,
  useReducer,
  useContext,
  type Dispatch,
  type ReactNode,
  useEffect,
} from "react";
import { reducer } from "./reducer";
import { type StateType, type ActionType } from "./state";
import { getSocket } from "../socket";

const StateContext = createContext<StateType | undefined>(undefined);
const DispatchContext = createContext<Dispatch<ActionType> | undefined>(
  undefined
);

interface StoreProviderProps {
  children: ReactNode;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const authToken = localStorage.getItem("jwt_token");
  const userDataRaw = localStorage.getItem("current_user_data");

  if (!authToken || !userDataRaw) return null;

  const userData = JSON.parse(userDataRaw);

  const [state, dispatch] = useReducer(reducer, {
    ...userData,
    chats: {},
    token: authToken,
  });

  // Ensure localStorage is initialized with chats
  const existingUserData = JSON.parse(
    localStorage.getItem(userData.id) || "{}"
  );

  localStorage.setItem(
    userData.id,
    JSON.stringify({
      chats: existingUserData.chats || {},
    })
  );
  const socket = getSocket(authToken);
  useEffect(() => {
    // Initialize global socket events
    socket.on("updateFromLog", (userId: any) => {
      console.log("message from ", userId);
    });

    // Cleanup on unmount
    return () => {
      socket.off("updateFromLog");
    };
  }, [socket]);

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
