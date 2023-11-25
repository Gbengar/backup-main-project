import React, { useState } from "react";
import Card from "../../../../../../components/card/Card";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";

const EachPricesCard = ({ children }) => {
  return <Card cardClass="sacard">{children}</Card>;
};

export default EachPricesCard;
