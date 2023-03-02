import React from "react";
import "./Home.scss";
import loginImg from "../../assets/homeImage.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="container hero">
        <div className="hero-text">
          <h2>Join our Network to connect with businesses</h2>
          <p>
            A place to meet greatminds and grow your connections for all
            business and personel needs
          </p>
          <p>
            We are here to connect small business owners to customers without
            the hassle of having to build a large social media presence
          </p>
          <div className="hero-buttons --flex-start">
            <button className="--btn --btn-danger">
              <Link to="/register">Register</Link>
            </button>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={loginImg} alt="Auth" />
        </div>
      </section>
    </div>
  );
};

export default Home;
