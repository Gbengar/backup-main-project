import React from "react";
import styles from "./MeetingDescriptor.module.scss";

const MeetingDescriptor = () => {
  return (
    <div className={styles["circle-options-container"]}>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#E8FCC2" }}
      >
        <div className={`${styles.tooltip}`}>Reminder</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#FEFAE0" }}
      >
        <div className={`${styles.tooltip}`}>Address</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#cbdbb2" }}
      >
        <div className={`${styles.tooltip}`}>Invitee</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#DFDFDF" }}
      >
        <div className={`${styles.tooltip}`}>Customized</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#CB958E" }}
      >
        <div className={`${styles.tooltip}`}>Public Holiday</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#240B36" }}
      >
        <div className={`${styles.tooltip}`}>Christian Obs</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#40798C" }}
      >
        <div className={`${styles.tooltip}`}>Observance</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#48435C" }}
      >
        <div className={`${styles.tooltip}`}>Season</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#9AC4F8" }}
      >
        <div className={`${styles.tooltip}`}>Local holiday</div>
      </div>
      <div
        className={`${styles.circle}`}
        style={{ backgroundColor: "#E36588" }}
      >
        <div className={`${styles.tooltip}`}>
          Clock change/Daylight Saving Time
        </div>
      </div>
    </div>
  );
};

export default MeetingDescriptor;
