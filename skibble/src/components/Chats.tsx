// import Audio from "../icons/Audio";
// import Edit from "../icons/Edit";
// import Mic from "../icons/Mic";
// import Profile from "./Profile";

import type { StateType } from "../appState/state";
import { useStore } from "../appState/store";
import Profile from "./Profile";

function Chats() {
  const store: StateType = useStore();
  return (
    <div className="chat-wrapper">
      {/* <div className="chatbox">
        <div className="container">
          <div className="chat-info">
            <Profile src="/assets/avatars/Jonathan Kelly.jpg" status={true} />
            <div className="info-container">
              <span className="chat-name">Jonathan Kelly</span>
              <div className="state-wrapper">
                <Edit color="var(--blue)" size={12} />
                <p>
                  Andy is typing... Something you dont need to know of.
                </p>
              </div>
            </div>
          </div>
          <div className="last-indicator">
            <div className="unread-text">4</div>
          </div>
        </div>
      </div>
      <div className="chatbox">
        <div className="container">
          <div className="chat-info">
            <Profile src="/assets/avatars/Amanda Lowery.jpg" status={true} />
            <div className="info-container">
              <span className="chat-name">Amanda Lowery</span>
              <div className="state-wrapper">
                <Mic color="var(--white)" size={15} />
                <p>Voice message</p>
              </div>
            </div>
          </div>
          <div className="last-indicator">
            <div className="unread-file">
              <div className="indicator"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="chatbox">
        <div className="container">
          <div className="chat-info">
            <Profile src="/assets/avatars/Sarah Page.jpg" status={true} />
            <div className="info-container">
              <span className="chat-name">Sarah Page</span>
              <div className="state-wrapper">
                <p className="state">
                  Andy: <span>sure! let’s do it</span>
                </p>
              </div>
            </div>
          </div>
          <div className="last-indicator">
            <div className="read-text">9:30</div>
          </div>
        </div>
      </div>
      <div className="chatbox">
        <div className="container">
          <div className="chat-info">
            <Profile src="/assets/avatars/Andi Lane.jpg" status={false} />
            <div className="info-container">
              <span className="chat-name">Andi Lane</span>
              <div className="state-wrapper">
                <Audio color="var(--white)" size={12} />
                <p>recorded_audio.m4a</p>
              </div>
            </div>
          </div>
          <div className="last-indicator">
            <div className="read-file">
              <div className="indicator"></div>
            </div>
          </div>
        </div>
      </div> */}
      {Object.keys(store.chats).length ? (
        Object.keys(store.chats).map((key: string) => (
          <div className="chatbox" key={key}>
            <div className="container">
              <div className="chat-info">
                <Profile
                  src={`${import.meta.env.VITE_API_BASE_URL}/file/stream/${
                    store.chats[key].avatar
                  }`}
                  status={store.chats[key].isOnline}
                />
                <div className="info-container">
                  <span className="chat-name">
                    {store.chats[key].firstName} {store.chats[key].lastName}
                  </span>
                  <div className="state-wrapper">
                    <p>{store.chats[key].firstName} is typing...</p>
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
    </div>
  );
}

export default Chats;
