import React, { useState } from "react";
import Card from "../../../../../../components/card/Card";
import "./style.scss";

const EachPricesCard = ({ children }) => {
  return <Card cardClass="sacard">{children}</Card>;
};

export default EachPricesCard;
