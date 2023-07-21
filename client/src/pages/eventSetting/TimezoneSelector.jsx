import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment-timezone";
import "./style.scss";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontSize: "16px", // Adjust the font size here as per your requirement
  }),
  // Custom styles for the label element
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "16px", // Adjust the font size here as per your requirement
  }),
};
const TimezoneSelector = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [currentTimeInSelectedZone, setCurrentTimeInSelectedZone] =
    useState("Select a time zone");

  const currentTime = moment();

  const timeZones = moment.tz.names().reduce((zones, zone) => {
    const [location, city] = zone.split("/");
    if (city) {
      const formattedCity = city.replace(/_/g, " "); // Replace underscores with spaces
      const timeZoneTime = moment().tz(zone);
      const utcOffset = timeZoneTime.utcOffset();
      const hours = Math.floor(Math.abs(utcOffset) / 60);
      const minutes = Math.abs(utcOffset) % 60;
      const sign = utcOffset >= 0 ? "+" : "-";
      const utcOffsetLabel = `${sign}${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const option = {
        value: zone,
        label: `${formattedCity} (UTC ${utcOffsetLabel})`,
      };
      if (zones[location]) {
        zones[location].options.push(option);
      } else {
        zones[location] = {
          label: location,
          options: [option],
        };
      }
    }
    return zones;
  }, {});

  const handleTimeZoneChange = (selectedOption) => {
    setSelectedTimeZone(selectedOption);
  };

  useEffect(() => {
    const updateCurrentTimeInSelectedZone = () => {
      if (selectedTimeZone) {
        const selectedTime = moment().tz(selectedTimeZone.value);
        setCurrentTimeInSelectedZone(
          `Current time in ${selectedTimeZone.label}: ${selectedTime.format(
            "YYYY-MM-DD HH:mm:ss"
          )}`
        );
      } else {
        setCurrentTimeInSelectedZone("Select a time zone");
      }
    };

    const intervalId = setInterval(updateCurrentTimeInSelectedZone, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [selectedTimeZone]);

  return (
    <div>
      <h4 className="timezone">{currentTimeInSelectedZone}</h4>
      <Select
        options={Object.values(timeZones)}
        value={selectedTimeZone}
        onChange={handleTimeZoneChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        styles={customStyles}
      />
    </div>
  );
};

export default TimezoneSelector;
