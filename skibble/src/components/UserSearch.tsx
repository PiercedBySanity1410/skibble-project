import { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router";
import { useStore } from "../appState/store";
interface UserInfo {
  userId: string;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  isOnline:boolean;
}
function UserSearch({
  keyword,
  onClick,
}: {
  keyword: string;
  onClick: () => void;
}) {
  const store = useStore();
  const [userlist, setlist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/search`,
          {
            signal: controller.signal,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.accessToken}`,
            },
            body: JSON.stringify({ keyword }),
          }
        );

        const data = await response.json();

        if (data.success) {
          setlist(data.data);
        } else {
          setlist([]);
        }
      } catch (error) {}
    })();
    return () => {
      controller.abort();
    };
  }, [keyword, store]);

  return (
    <>
      {userlist.map((item: UserInfo) => (
        <div
          className="chatbox"
          key={item.username}
          onClick={() => {
            onClick();
            navigate(`/chat/${item.userId}`);
          }}
        >
          <div className="container">
            <div className="chat-info">
              <Profile
                src={item.avatarUrl}
                status={item.isOnline}
              />
              <div className="info-container">
                <span className="chat-name">{`${item.firstName} ${item.lastName}`}</span>
                <div className="state-wrapper">
                  <p>{`@${item.username}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {userlist.length === 0 && (
        <div className="empty-chat">
          <h1>No User Found</h1>
        </div>
      )}
    </>
  );
}

export default UserSearch;
