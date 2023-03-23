import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowsAngleExpand } from "react-icons/bs";
import "./createButtonn.scss";

const Button = ({ linkTo, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [buttonRef]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsClicked(true);
  };

  return (
    <div ref={buttonRef} className="button-wrapper">
      <button
        className={`button ${isClicked ? "clicked" : ""}`}
        onClick={handleClick}
      >
        <span className="icon-wrapper-right">
          <BsArrowsAngleExpand size={10} />
        </span>
        <span className="button-text">{buttonText}</span>
      </button>
      {isOpen && (
        <div className="nav-links">
          <NavLink to={linkTo} className="nav-link">
            Link 1
          </NavLink>
          <NavLink to={linkTo} className="nav-link">
            Link 2
          </NavLink>
          <NavLink to={linkTo} className="nav-link">
            Link 3
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Button;
