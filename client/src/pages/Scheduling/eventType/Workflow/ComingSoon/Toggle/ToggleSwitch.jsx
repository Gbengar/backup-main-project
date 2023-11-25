import React, { useState } from "react";
import "./style.scss";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  return (
    <div className="fullbody">
      <span
        className={`switch ${isChecked ? "checked" : ""}`}
        onClick={handleToggle}
      >
        <input
          type="checkbox"
          id="switcher"
          checked={isChecked}
          onChange={handleToggle}
        />
        <label htmlFor="switcher"></label>
      </span>
    </div>
  );
};

export default ToggleSwitch;
