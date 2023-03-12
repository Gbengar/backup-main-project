import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
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

const ViewProfile = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.auth.users);
  const { _id } = useParams(); // get the ID parameter from the URL

  console.log(_id);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
  });

  useLayoutEffect(() => {
    const user = users.find((u) => u._id === _id); // find the user with the ID

    console.log(user);
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
      });
    }
  }, [_id, users]);

  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
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

              <>
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
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewProfile;
