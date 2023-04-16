import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers } from "../../../redux-app/features/auth/authSlice";

const UserFollowing = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user, users } =
    useSelector((state) => state.auth);

  const [followingsUsers, setFollowingsUsers] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const checkFollow = () => {
      if (user && users) {
        const followingUsers = user.followings;
        setFollowingsUsers(followingUsers);
      }
    };
    checkFollow();
  }, [user, users, setFollowingsUsers]);

  useEffect(() => {
    if (followingsUsers) {
      const followingUserNames = users
        .filter((u) => followingsUsers.includes(u._id))
        .map((u) => u.name);
      console.log(followingUserNames);
    }
  }, [followingsUsers, users]);

  return <div>UserFollowing</div>;
};

export default UserFollowing;
