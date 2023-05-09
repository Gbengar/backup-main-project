import React from "react";
import "../AddNewEvent.scss";
import Back from "../../../../components/Buttons/Back/Back";
import { DropdownButton } from "../../../../components/TImeline/createButton/SettingsButton";
import Share from "../../../../components/Buttons/Share/Share";

const CompleteSchedule = () => {
  return (
    <>
      <div className="tophead">
        <Back />
        <div className="title-container">
          <h3>Add One-on-One Event Type</h3>
        </div>
        <Share />
      </div>
      <div className="settings">
        <DropdownButton />
      </div>
      <div className="container">
        <div className="form-section">
          <form>
            <div className="section-header">
              <div className="--flex-end">
                <div className="buttinnext">
                  <button>Cancel</button>
                </div>
                <div className="buttin">
                  <button type="submit">Next</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompleteSchedule;
