// import Audio from "../icons/Audio";
// import Edit from "../icons/Edit";
// import Mic from "../icons/Mic";
// import Profile from "./Profile";
import { useStore } from "../appState/store";
import Profile from "./Profile";
import { useNavigate } from "react-router";

function Chats() {
  const store = useStore();
  const navigate = useNavigate();
  return (
    <>
      {Object.keys(store.chats).length ? (
        Object.keys(store.chats).map((key: string) => (
          <div
            className="chatbox"
            key={key}
            onClick={() => {
              navigate(`/chat/${store.chats[key].userId}`);
            }}
          >
            <div className="container">
              <div className="chat-info">
                <Profile
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/profile/${
                    store.chats[key].avatarUrl
                  }`}
                  status={store.chats[key].isOnline}
                />
                <div className="info-container">
                  <span className="chat-name">
                    {store.chats[key].firstName} {store.chats[key].lastName}
                  </span>
                  <div className="state-wrapper">
                    <p>typing...</p>
                  </div>
                </div>
              </div>
              <div className="last-indicator">
                <div className="unread-text">-</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-chat">
          <h1>No Chats Found</h1>
          <p>Start building your network by searching and adding new chats.</p>
        </div>
      )}
    </>
  );
}

export default Chats;
