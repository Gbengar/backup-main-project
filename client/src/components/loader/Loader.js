import React from "react";
import "./Loader.scss";
import ReactDOM from "react-dom";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <ThreeCircles
          height="50"
          width="50"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="red"
          innerCircleColor="yellow"
          middleCircleColor="green"
        />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <ThreeCircles
        height="80"
        width="80"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#FFD700"
        innerCircleColor="#FF00FF"
        middleCircleColor="#008080"
      />
    </div>
  );
};

export default Loader;
