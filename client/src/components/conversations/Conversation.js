import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux-app/features/auth/authSlice";
import "./conversation.css";

function Conversation({ conversation, currentUser }) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await users.find((user) => user._id === friendId);
        setUserData(res);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, conversation, users]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={userData?.photo} alt="" />
      <span className="conversationName">{userData?.name || "Loading..."}</span>
    </div>
  );
}

export default Conversation;
