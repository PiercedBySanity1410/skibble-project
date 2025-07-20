import { useEffect, useRef } from "react";
import Call from "../icons/Call";
import Document from "../icons/Document";
// import Forward from "../icons/Forward";
import Image from "../icons/Image";
import Mic from "../icons/Mic";
import Send from "../icons/Send";
import Upload from "../icons/Upload";
import Video from "../icons/Video";
import SocketManager from "../SocketManager";
import { useDispatch, useStore } from "../appState/store";
import WelcomeScreen from "./Welcome";
import "../styles/chatcontent.scss";
import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import type { ActionType, Message } from "../appState/types";
export function getLastSeenText(isoTime: string): string {
  if (isoTime == "") return "last seen --";
  const lastSeenDate: Date = new Date(isoTime);
  const now: Date = new Date();

  const diffTime: number = now.getTime() - lastSeenDate.getTime();
  const diffDays: number = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const sameDay: boolean = now.toDateString() === lastSeenDate.toDateString();

  const yesterday: Date = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday: boolean =
    yesterday.toDateString() === lastSeenDate.toDateString();

  if (sameDay) {
    return `last seen today at ${formatTime(lastSeenDate)}`;
  } else if (isYesterday) {
    return `last seen yesterday at ${formatTime(lastSeenDate)}`;
  } else if (diffDays < 7) {
    return `last seen ${lastSeenDate.toLocaleDateString(undefined, {
      weekday: "long",
    })} at ${formatTime(lastSeenDate)}`;
  } else if (now.getFullYear() === lastSeenDate.getFullYear()) {
    return `last seen ${lastSeenDate.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    })} at ${formatTime(lastSeenDate)}`;
  } else {
    return `last seen ${lastSeenDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} at ${formatTime(lastSeenDate)}`;
  }
}

function ChatContent() {
  const store = useStore();
  const navigate = useNavigate();
  const { userId } = useParams();
  const socket = SocketManager.get();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  if (!socket || !userId || !store.accessToken || !store.currentChat)
    return <WelcomeScreen />;
  useEffect(() => {
    if (userId == store.userId) navigate("/chat");
    if (store.chats[userId]) {
      console.log(store.chats[userId]);
      dispatch({ type: "currentChat:update", chat: store.chats[userId] });
    } else {
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/user/searchbyid`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId }),
            }
          );

          const response = await res.json();
          if (response.success) {
            dispatch({ type: "currentChat:update", chat: response.data });
            socket.emit("chats:add", {
              accessToken: store.accessToken,
              list: [userId],
            });
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      })();
    }
  }, [userId, store.chats]);

  const handleSendMessage = () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;
    const message: Message = {
      content: inputRef.current.value.trim(),
      contentType: "text",
      timestamp: new Date().toISOString(),
      deliveryStatus: "sent",
    };
    var updateLog: ActionType = {
      type: "chat:message:sender",
      messageId: uuidv4(),
      senderId: store.userId,
      receiverId: userId,
      message,
    };
    if (!store.chats[userId]) {
      dispatch({ type: "chat:update:add", chat: store.currentChat });
      updateLog["senderInfo"] = {
        userId: store["userId"],
        username: store["username"],
        avatarUrl: store["avatarUrl"],
        firstName: store["firstName"],
        lastName: store["lastName"],
        isOnline: true,
        isTyping: false,
        lastSeen: new Date().toISOString(),
      };
    }
    socket.emit("updateFromLog", updateLog);
    dispatch(updateLog);
    inputRef.current.value = "";
  };
  return (
    store.currentChat && (
      <div className="chat-content">
        <div className="chat-header">
          <div className="content-wrapper">
            <div className="chat-profile">
              <div className="chat-avatar image-wrapper">
                {store.currentChat.avatarUrl && (
                  <img
                    src={
                      store.currentChat.avatarUrl
                        ? store.currentChat.avatarUrl
                        : "#"
                    }
                    alt="Avatar"
                  />
                )}
              </div>
              <div className="chat-info">
                <div className="chat-name">{`${store.currentChat.firstName} ${store.currentChat.lastName}`}</div>
                <div className="state-info">
                  {store.currentChat.isTyping
                    ? "typing..."
                    : store.currentChat.isOnline
                    ? "online"
                    : getLastSeenText(store.currentChat.lastSeen)}
                </div>
              </div>
            </div>
            <div className="chat-options">
              <Video size={18} color="var(--grey)" />
              <Call size={18} color="var(--grey)" />
              <Image size={18} color="var(--grey)" />
              <Document size={18} color="var(--grey)" />
            </div>
          </div>
        </div>

        <div className="message-content">
          <div className="content-area"></div>
        </div>

        <div className="message-input-wrapper">
          <div className="message-input">
            <div className="image-wrapper">
              <img
                src={store.avatarUrl}
                alt="Avatar"
              />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Your Message"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <div className="options">
              <Mic color="var(--white)" size={16} />
              <Upload color="var(--white)" size={16} />
              <Send
                color="var(--white)"
                size={16}
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ChatContent;
