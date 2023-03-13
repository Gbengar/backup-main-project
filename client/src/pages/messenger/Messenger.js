import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { getUser, selectUser } from "../../redux-app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./messenger.css";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useEffect, useState } from "react";
import axios from "axios";

export const Messenger = () => {
  useRedirectLoggedOutUser("/login");

  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  console.log(user);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user]);
  console.log(currentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users//messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  console.log(messages);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <Message message={m} own={m.sender === user._id} />
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Write your message here..."
                ></textarea>
                <button className="chatSubmitButton">Send</button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
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
