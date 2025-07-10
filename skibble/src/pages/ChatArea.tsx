import { useParams } from "react-router"
// import DocumentView from "../components/DocumentView"
import ChatContent from "./ChatContent"

function ChatArea() {
  const {userid}=useParams();
  if(!userid) return <></>;
  return (
    <div className="main-layout-wrapper">
        <ChatContent user_id={userid} />
        {/* <DocumentView/> */}
    </div>
  )
}

export default ChatArea