import React, { useState } from "react";
import Pimg from "../../assets/images/background1.png";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./ChangePassword.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "../../components/loader/Loader";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};
const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const handleInputChange = () => {};
  useRedirectLoggedOutUser("/login");
  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <form action="">
                <p>
                  <label>Old Password:</label>
                  <PasswordInput
                    placeholder="Old Password"
                    name="password"
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>New Password:</label>

                  <PasswordInput
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Confirm New Password:</label>

                  <PasswordInput
                    placeholder="Confirm New Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                  />
                </p>

                <button className="--btn --btn-danger --btn-block">
                  Change Password
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
