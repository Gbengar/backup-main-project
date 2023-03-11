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
import { handleByID } from "../../components/searchFilter/SearchFilter";

const ViewProfile = () => {
  //handleByID()

  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  console.log(users);
  const initialState = {
    name: users.id.name,
    email: users?.id.email,
    phone: users?.id.phone,
    photo: users?.id.photo,
    bio: users?.id.bio,
  };
  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (users.id) {
      setProfile({
        ...profile,
        name: users?.id.name,
        email: users?.id.email,
        phone: users?.id.phone,
        photo: users?.id.photo,
        bio: users?.id.bio,
      });
    }
  }, [users.id, profile]);

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
                  <img src={users?.id.photo} alt="profileImage" />
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
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewProfile;
