import { useState } from "react";
import DocumentView from "../components/DocumentView";
import ChatContent from "./ChatContent";

function ChatArea() {
  const [active, setactive] = useState(false);
  return (
    <div className="main-layout-wrapper">
      <ChatContent
        enable={() => {
          setactive(true);
        }}
      />
      {active && (
        <DocumentView
          disable={() => {
            setactive(false);
          }}
        />
      )}
    </div>
  );
}

export default ChatArea;
