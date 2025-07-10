import { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router";
interface UserInfo {
  id: string;
  username: string;
  first: string;
  last: string;
  profileimg: string;
}
function UserSearch({
  username,
  onClick,
}: {
  username: string;
  onClick: () => void;
}) {
  const [userlist, setlist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
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
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username }),
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
  }, [username]);

  return (
    <div className="chat-wrapper">
      {userlist.map((item: UserInfo) => (
        <div
          className="chatbox"
          key={item.username}
          onClick={() => {
            onClick();
            navigate(`/chat/${item.id}`);
          }}
        >
          <div className="container">
            <div className="chat-info">
              <Profile
                src={`${import.meta.env.VITE_API_BASE_URL}/file/stream/${
                  item.profileimg
                }`}
                status={false}
              />
              <div className="info-container">
                <span className="chat-name">{`${item.first} ${item.last}`}</span>
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
    </div>
  );
}

export default UserSearch;
