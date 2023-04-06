import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux-app/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/EditProfile";
import Search from "../search/Search";
import SearchFilter from "../searchFilter/SearchFilter";

import { TiMessages } from "react-icons/ti";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="header">
      <nav>
        <div className="logo" onClick={goHome}>
          <img src={logo} alt="" />
        </div>
        <ShowOnLogin>
          <SearchFilter />
        </ShowOnLogin>
        <ul className="home-links">
          <ShowOnLogin>
            <li className="--flex-center">
              <NavLink to="/profile" className={activeLink}>
                <FaUserCircle size={20} />
                &nbsp;
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to="/timeline" className={activeLink}>
                Timeline
              </NavLink>
            </li>
            <li>
              <NavLink to="/homepage" className={activeLink}>
                HomePage
              </NavLink>
            </li>

            <li>
              <NavLink to="/messenger">
                <TiMessages size={20} className={activeLink} />
              </NavLink>
            </li>

            <li>
              <NavLink to="/notification">
                <MdOutlineNotificationsActive
                  size={20}
                  className={activeLink}
                />
              </NavLink>
            </li>
            <li>
              <button className="--btn --btn-secondary" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
