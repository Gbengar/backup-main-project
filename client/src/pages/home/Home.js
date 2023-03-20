import React, { useEffect, useState } from "react";
import "./Home.scss";
import loginImg from "../../assets/homeImage.svg";
import { Link } from "react-router-dom";
import AnimatedLetters from "../../components/addDesign/animatedLetters/AnimatedLetters";

const Home = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  return (
    <div>
      <div className="text-zone"></div>
      <section className="container hero">
        <div className="hero-text">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={[
                "J",
                "o",
                "i",
                "n",
                " ",
                "o",
                "u",
                "r",
                " ",
                "N",
                "e",
                "t",
                "w",
                "o",
                "r",
                "k",
              ]}
              idx={15}
            />
          </h1>
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
