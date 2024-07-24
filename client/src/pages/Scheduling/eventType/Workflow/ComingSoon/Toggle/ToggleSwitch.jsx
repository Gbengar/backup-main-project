// ToggleSwitch.jsx
import React, { useState } from "react";

const ToggleSwitch = ({
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
  updatePrices,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
    updatePrices(val);
  };

  return (
    <div>
      <div
        style={{
          height: 44,
          width: 350,
          backgroundColor: "gray",
          borderRadius: getRoundCorner ? 10 : 0,
          border: `1px solid ${selectionColor}`,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <button
          onClick={() => updatedSwitchData(1)}
          style={{
            flex: 2,
            backgroundColor: getSelectionMode === 1 ? selectionColor : "gray",
            borderRadius: getRoundCorner ? 10 : 0,
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: getSelectionMode === 1 ? "black" : selectionColor,
              fontWeight: "bold",
            }}
          >
            {option1}
          </span>
        </button>
        <button
          onClick={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 2 ? selectionColor : "gray",
            borderRadius: getRoundCorner ? 10 : 0,
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: getSelectionMode === 2 ? "black" : selectionColor,
              fontWeight: "bold",
            }}
          >
            {option2}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
