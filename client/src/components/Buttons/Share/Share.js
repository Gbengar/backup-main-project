import React from "react";

import ShareIcon from "@mui/icons-material/Share";
import "./Share.scss";
const Share = () => {
  function onShare() {
    console.log("clicked");
  }
  return (
    <div className="share">
      <ShareIcon />
      <button onClick={onShare}>Share</button>
    </div>
  );
};

export default Share;
