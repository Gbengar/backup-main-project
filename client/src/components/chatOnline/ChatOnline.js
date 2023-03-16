import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`${API_URL}friends/` + currentId);
        console.log("API response:", res.data);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`${API_URL}/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(onlineUsers);
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={o?.photo} alt="null" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
