import React from "react";
import "./FlowCard.scss";
import WorkFlowCard from "../WorkFlowCard";
import { Icon } from "@iconify/react";

// Icons

const icon1 = (
  <Icon
    icon="fluent:mail-clock-24-regular"
    color="#FFC145"
    width="50"
    height="50"
  />
);
const icon2 = (
  <Icon
    icon="fluent:mail-clock-24-regular"
    color="#002626"
    width="50"
    height="50"
  />
);
const icon3 = <Icon icon="line-md:email" color="red" width="50" height="50" />;
const icon4 = (
  <Icon
    icon="fluent:phone-checkmark-20-regular"
    color="#6F1A07"
    width="50"
    height="50"
  />
);
const icon5 = <Icon icon="wpf:iphone" color="#FFCDBC" width="50" height="50" />;
const icon6 = (
  <Icon
    icon="fluent:mail-unread-28-regular"
    color="#FDE74C"
    width="50"
    height="50"
  />
);

const FlowCard = () => {
  return (
    <div className="user-summ white-background">
      {" "}
      {/* Add the white background class */}
      <div className="info-summ">
        <WorkFlowCard
          icon={icon1}
          title={"Email reminder to invitee"}
          content={
            "Reduce no-shows — send automated email reminders to invitees"
          }
          button={"Use workflow"}
          disable
        />
        {/* Add white background class to disable the button */}
        <WorkFlowCard
          icon={icon2}
          title={"Email reminder to host"}
          content={"Never miss an event — get automated email reminders"}
          button={"Use workflow"}
          disable
        />
        {/* Add white background class to disable the button */}
        <WorkFlowCard
          icon={icon3}
          title={"Send thank you email"}
          content={"Build relationships with a quick thanks"}
          button={"Use workflow"}
          disable
        />
        {/* Add white background class to disable the button */}
        <WorkFlowCard
          icon={icon4}
          title={"Send thank you email"}
          content={"Build relationships with a quick thanks"}
          button={"Use workflow"}
          disable
        />
        {/* Add white background class to disable the button */}
        <WorkFlowCard
          icon={icon5}
          title={"Text booking confirmation to host"}
          content={"Keep hosts up-to-date with scheduled events"}
          button={"Use workflow"}
          disable
        />
        {/* Add white background class to disable the button */}
        <WorkFlowCard
          icon={icon6}
          title={"Email your own feedback survey"}
          content={
            "Email a survey link from a third party like Typeform or Google Forms to get feedback from invitees after your event"
          }
          button={"Use workflow"}
          disable
        />
      </div>
    </div>
  );
};

export default FlowCard;
