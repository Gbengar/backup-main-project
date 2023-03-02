import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { TiUserAdd } from "react-icons/ti";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux-app/features/auth/authService";
import { register, RESET } from "../../redux-app/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const initialState = {
  username: "",
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState(initialState);
  const { username, name, email, password, password2 } = formData;

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (e) => {
    if (e) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }

    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    if (password.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!username || !name || !email || !password) {
      return toast.error("All field are required");
    }
    if (password.length < 7) {
      return toast.error("Password must be up to 8 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Password do not match");
    }

    if (username.length < 3) {
      return toast.error("Username must be more than 3 character");
    }

    if (username.length > 10) {
      return toast.error("Username must not be more than 10 character");
    }

    const userData = {
      username,
      name,
      email,
      password,
    };
    // console.log userData
    await dispatch(register(userData));
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAdd size={35} color="#999" />
          </div>
          <br />
          <h2>Sign Up</h2>
          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Full Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="@Username"
              pattern="^\S+$"
              required
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
            />
            {/* Password Strength*/}

            <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)} &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)} &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)} &nbsp; Special Character(!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)} &nbsp; At least 8 Character
                  </span>
                </li>
              </ul>
            </Card>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already have an account? &nbsp; </p>
            <Link to="/login">Sign In</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
