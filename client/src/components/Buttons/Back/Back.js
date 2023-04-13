import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./Back.scss";
const Back = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <div className="back">
      <ArrowLeftIcon />
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default Back;
