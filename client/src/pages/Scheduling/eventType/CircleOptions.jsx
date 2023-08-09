import React from "react";
import styles from "./CircleOptions.module.scss";

const CircleOptions = () => {
  return (
    <div className={styles["circle-options-container"]}>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#ade8af" }}
      >
        <div className={`${styles.tooltip}`}>Reminder</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#d5d2bc" }}
      >
        <div className={`${styles.tooltip}`}>Address</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#c1b3b3" }}
      >
        <div className={`${styles.tooltip}`}>Invitee</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#b0b093" }}
      >
        <div className={`${styles.tooltip}`}>Customized</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#e4c1e4" }}
      >
        <div className={`${styles.tooltip}`}>Recurring</div>
      </div>
    </div>
  );
};

export default CircleOptions;
