import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "../../redux-app/features/auth/authSlice";
import "./Profile.scss";
import Loader, { Spinner } from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    bio: user?.bio || "",
  };
  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
      });
    }
  }, [user]);

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Welcome, {user?.name}</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              <>
                <Link
                  className="--btn --btn-danger --btn-block"
                  to="/profile/edit"
                >
                  Edit Profile
                </Link>
              </>
              <br />
              {!isLoading && user === null ? (
                <Spinner />
              ) : (
                <>
                  <div className="profile-photo">
                    <img src={user?.photo} alt="profileImage" />
                  </div>
                  <form>
                    <p>
                      <label>Name:</label>
                      <span>{profile?.name}</span>
                    </p>
                    <p>
                      <label>Email:</label>
                      <span>{profile?.email}</span>
                    </p>
                    <p>
                      <label>Phone:</label>
                      <span>{profile?.phone}</span>
                    </p>
                    <p>
                      <label>Bio:</label>
                      <textarea
                        value={profile?.bio}
                        cols="30"
                        rows="10"
                        disabled
                      ></textarea>
                    </p>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
