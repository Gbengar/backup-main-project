import React, { useState } from "react";
import Select from "react-select";
import { countries } from "countries-list";

const countryOptions = Object.keys(countries).map((countryCode) => ({
  label: countries[countryCode].name,
  value: countryCode,
  emoji: countries[countryCode].emoji,
}));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontSize: "16px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "16px",
  }),
};

const CountrySelect = ({ onCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [holidays, setHolidays] = useState([]);

  const handleSelectChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    if (selectedOption) {
      fetchHolidays(selectedOption.value);
    }
  };

  const fetchHolidays = (countryCode) => {
    const apiKey = "a010d3e47e49d3e9e908e323d2783ff5b1fc038e"; // Replace this with your actual API key
    const year = new Date().getFullYear();
    const nextYear = year + 1;

    // Make an API call to Calendarific to get holidays for the current year
    fetch(
      `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${countryCode}&year=${year}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.response && data.response.holidays) {
          let currentYearHolidays = data.response.holidays;

          // Make an API call to Calendarific to get holidays for the next year
          fetch(
            `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${countryCode}&year=${nextYear}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if (data.response && data.response.holidays) {
                let nextYearHolidays = data.response.holidays;

                // Combine holidays from both years
                let allHolidays = [...currentYearHolidays, ...nextYearHolidays];
                setHolidays(allHolidays);
                onCountryChange(allHolidays);
                console.log(allHolidays);
              } else {
                console.error("Error fetching holidays for next year.");
              }
            })
            .catch((error) => {
              console.error("Error fetching holidays for next year:", error);
            });
        } else {
          console.error("Error fetching holidays for the current year.");
        }
      })
      .catch((error) => {
        console.error("Error fetching holidays for the current year:", error);
      });
  };

  return (
    <div>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleSelectChange}
        getOptionLabel={(option) => (
          <span>
            {option.emoji} {option.label}
          </span>
        )}
        getOptionValue={(option) => option.value}
        styles={customStyles}
      />
    </div>
  );
};

export default CountrySelect;
