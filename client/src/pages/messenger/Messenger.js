import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { getUser, selectUser } from "../../redux-app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./messenger.css";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

export const Messenger = () => {
  useRedirectLoggedOutUser("/login");

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          <Conversation />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Write your message here..."
            ></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlneWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
};
