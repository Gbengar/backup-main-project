import React, { useState } from "react";
import "./PageNation.scss"; // Import your CSS file
import InfoCircle from "../../InfoCircle/InfoCircle";
import MeetingDescriptor from "./MeetingDescriptor";
import { CgPlayTrackPrevR, CgPlayTrackNextR } from "react-icons/cg";
import { ImUserMinus } from "react-icons/im";

const icon1 = <CgPlayTrackPrevR size={20} color="#fff" />;
const icon2 = <CgPlayTrackNextR size={20} color="#fff" />;
const icon3 = <ImUserMinus size={20} color="#fff" />;

const PageNation = ({
  events,
  handleIcon1Click,
  handleIcon2Click,
  handleIcon3Click,
}) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    if (activeButton === buttonId) {
      setActiveButton(null); // Revert if the same button is clicked again
    } else {
      setActiveButton(buttonId); // Set the clicked button as active
    }
  };

  return (
    <div className="user-summary">
      <h3 className="--mt">
        <MeetingDescriptor />
      </h3>
      <div className="info-summary">
        <InfoCircle
          icon={icon1}
          title={"Past Events"}
          bgColor="card11"
          onClick={() => {
            handleIcon1Click();
            handleButtonClick(1); // Pass a unique identifier for this button
          }}
          active={activeButton === 1} // Check if this button is active
        />
        <InfoCircle
          icon={icon2}
          title={"Upcoming Events"}
          bgColor="card22"
          onClick={() => {
            handleIcon2Click();
            handleButtonClick(2); // Pass a unique identifier for this button
          }}
          active={activeButton === 2} // Check if this button is active
        />
        <InfoCircle
          icon={icon3}
          title={"Events Range"}
          bgColor="card33"
          onClick={() => {
            handleIcon3Click();
            handleButtonClick(3); // Pass a unique identifier for this button
          }}
          active={activeButton === 3} // Check if this button is active
        />
      </div>
    </div>
  );
};

export default PageNation;
