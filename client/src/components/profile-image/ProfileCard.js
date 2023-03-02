import React from "react";
import styles from "./ProfileCard.module.scss";
const ProfileCard = ({ children, cardClass }) => {
  return (
    <div>
      <div className={`${styles.card} ${cardClass}`}>{children}</div>
    </div>
  );
};

export default ProfileCard;
