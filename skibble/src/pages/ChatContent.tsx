import { useEffect, useState, useRef } from "react";
import Call from "../icons/Call";
import Document from "../icons/Document";
import Forward from "../icons/Forward";
import Image from "../icons/Image";
import Mic from "../icons/Mic";
import Send from "../icons/Send";
import Upload from "../icons/Upload";
import Video from "../icons/Video";
import SocketManager from "../SocketManager";
import { useDispatch, useStore } from "../appState/store";
import type { ChatUser } from "../appState/types";
import WelcomeScreen from "./Welcome";
import "../styles/chatcontent.scss";
import { useParams } from "react-router";
function ChatContent() {
  const store = useStore();
  const { userId } = useParams();
  if(!userId) return <WelcomeScreen/>;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<ChatUser>({
    userId,
    username: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    isOnline: false,
    lastSeen: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const socket = SocketManager.get();
  if (!socket) return <WelcomeScreen/>;
  const existingUser = store.chats[userId];
  useEffect(() => {
    if (existingUser) {
      setUserData(existingUser);
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

          const data = await res.json();
          if (data.success) {
            setUserData(data.payload);
          } else {
            console.warn("User not found:", data.message);
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      })();
    }
  }, [userId, store.chats]);

  const handleSendMessage = () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;
    const message = inputRef.current.value.trim();
    if (!existingUser) dispatch({ type: "chat:update:add", payload: userData });
    socket.emit("updateFromLog", {
      from: store.userId,
      to: userId,
      msg: message,
    });
    inputRef.current.value = "";
  };

  if (!store.accessToken || !userData.username) {
    return <WelcomeScreen />;
  }

  return (
    <div className="chat-content">
      <div className="chat-header">
        <div className="content-wrapper">
          <div className="chat-profile">
            <div className="chat-avatar image-wrapper">
              <img
                src={
                  userData.avatarUrl
                    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/profile/${
                        userData.avatarUrl
                      }`
                    : "#"
                }
                alt="Avatar"
              />
            </div>
            <div className="chat-info">
              <div className="chat-name">{`${userData.firstName} ${userData.lastName}`}</div>
              <div className="state-info">typing...</div>
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
        <div className="content-area">
          <div className="message-box from">
            <div className="content">
              <div className="image-wrapper">
                <img src="/assets/avatars/Alec Whitten.jpg" alt="Avatar" />
              </div>
              <div className="message-wrapper">
                <div className="message-info">
                  Alec <span>1d</span>
                </div>
                <div className="message-wrapper-content">
                  <div className="message-text">
                    <div className="text-content corner">
                      Hey guys! Have a great working week!
                    </div>
                    <Forward size={10} color="var(--grey)" />
                  </div>
                  <div className="message-react">
                    <div className="reaction-wrapper">
                      <div className="reaction">😻</div>
                      <div className="count">2</div>
                    </div>
                    <div className="reaction-wrapper">
                      <div className="reaction">🍕</div>
                      <div className="count">4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="message-input-wrapper">
        <div className="message-input">
          <div className="image-wrapper">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/uploads/profile/${
                store.avatarUrl
              }`}
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
            <Send color="var(--white)" size={16} onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
