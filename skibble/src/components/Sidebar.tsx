import { useNavigate } from "react-router";
import Logout from "../icons/Logout";
import "../styles/sidebar.scss";
import Chats from "./Chats";
import SearchBox from "./SearchBox";
import { useStore } from "../appState/store";
import { useRef, useState } from "react";
import UserSearch from "./UserSearch";
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
              src={`${import.meta.env.VITE_API_BASE_URL}/file/stream/${
                store.avatar
              }`}
              alt="Avatar"
            />
          </div>
          <Logout
            onClick={() => {
              localStorage.removeItem("jwt_token");
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
        {search === "" ? (
          <Chats />
        ) : (
          <UserSearch onClick={()=>{
            if(inputRef.current){
              inputRef.current.value="";
            }
            setSearch("");
          }} username={search} />
        )}
      </div>
    </>
  );
}

export default Sidebar;
