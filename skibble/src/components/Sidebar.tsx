import { useNavigate } from "react-router";
import Logout from "../icons/Logout";
import "../styles/sidebar.scss";
import Chats from "./Chats";
import SearchBox from "./SearchBox";
import { useStore } from "../appState/store";
import { useRef, useState } from "react";
import UserSearch from "./UserSearch";
import SocketManager from "../SocketManager";
function Sidebar() {
  const navigate = useNavigate();
  const store = useStore();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="chat-sidebar">
        <div className="profile-header">
          <div className="image-wrapper avatar">
            <img
              src={store.avatarUrl}
              alt="Avatar"
            />
          </div>
          <Logout
            onClick={() => {
              SocketManager.disconnect(store.accessToken);
              localStorage.removeItem("sessionUser");
              navigate("/login");
            }}
            size={18}
            color="var(--grey)"
          />
        </div>
        <div className="message-header">
          <span className="heading">Messages</span>
          <div className="indicator"></div>
        </div>
        <SearchBox
          ref={inputRef}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="chat-wrapper">
          {search === "" ? (
            <Chats />
          ) : (
            <UserSearch
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
                setSearch("");
              }}
              keyword={search}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
