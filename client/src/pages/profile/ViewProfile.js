import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUsers,
  selectUser,
} from "../../redux-app/features/auth/authSlice";
import "./Profile.scss";
import Loader, { Spinner } from "../../components/loader/Loader";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import OtherUsersPageMenu from "../../components/pageMenu/OtherUsersPageMenu";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

const ViewProfile = () => {
  const dispatch = useDispatch();
  useRedirectLoggedOutUser("/login");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.auth.users);

  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  console.log(user);

  const { _id: viewedUserId } = useParams(); // get the ID parameter from the URL

  const [isFollowing, setIsFollowing] = useState(false);

  const followUser = async () => {
    try {
      const res = await axios.put(`${API_URL}/${viewedUserId}/follow`, {
        userId: user._id,
      });
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      const res = await axios.put(`${API_URL}/${viewedUserId}/unfollow`, {
        userId: user._id,
      });
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userProfile = users.find((u) => u._id === viewedUserId);
    if (user && user._id && userProfile) {
      setIsFollowing(userProfile.followers.includes(user._id));
      setProfile({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        photo: userProfile.photo,
        bio: userProfile.bio,
      });
    }
  }, [viewedUserId, users, user]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
  });

  // Check if the profile belongs to the logged-in user
  const isMyProfile = user && user._id === viewedUserId;

  return (
    <>
      <section>
        <div className="container">
          <OtherUsersPageMenu />
          <h2>Profile</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {isSuccess && (
                <div className="--flex-start profile">
                  <Card cardClass={"card"}>
                    {/* Show follow/unfollow button based on whether the profile belongs to the logged-in user */}
                    {!isMyProfile && isLoggedIn && (
                      <>
                        {isFollowing ? (
                          <button
                            className="--btn --btn-danger --btn-block"
                            onClick={unfollowUser}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            className="--btn --btn-primary --btn-block"
                            onClick={followUser}
                          >
                            Follow
                          </button>
                        )}
                      </>
                    )}
                    <br />
                    <div className="profile-photo">
                      <img src={profile.photo} alt="profileImage" />
                    </div>
                    <form>
                      <p>
                        <label>Name:</label>
                        <span>{profile.name}</span>
                      </p>
                      <p>
                        <label>Email:</label>
                        <span>{profile.email}</span>
                      </p>
                      <p>
                        <label>Phone:</label>
                        <span>{profile.phone}</span>
                      </p>
                      <p>
                        <label>Bio:</label>
                        <textarea
                          value={profile.bio}
                          cols="30"
                          rows="10"
                          disabled
                        ></textarea>
                      </p>
                    </form>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ViewProfile;
