import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.css";
import { Link } from "react-router-dom";

const Settings = () => {
  const [numWells, setNumWells] = useState(null);
  const [numWavelengths, setNumWavelengths] = useState(null);
  const [lmValues, setLmValues] = useState(
    Array.from({ length: numWavelengths }, () => "")
  );
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/settings");
      const numWells = response.data.NoOfWells;
      const numWavelengths = response.data.NoOfWavelengths;
      // const lmValues = response.data.Lm;
      setNumWells(numWells);
      setNumWavelengths(numWavelengths);
      // setLmValues(JSON.stringify(lmValues));
    } catch (error) {
      console.error("Error fetching data: ", error.response.data);
    }
  };

  const handleChangeNumWells = (e) => {
    setNumWells(parseInt(e.target.value));
  };

  const handleChangeNumWavelengths = (e) => {
    const value = parseInt(e.target.value);
    setNumWavelengths(value);
    setLmValues(Array.from({ length: value }, () => ""));
  };

  const handleChangeLmValue = (index, value) => {
    const newLmValues = [...lmValues];
    newLmValues[index] = value;
    setLmValues(newLmValues);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:8090/settings", {
        NoOfWells: numWells,
        NoOfWavelengths: numWavelengths,
        Lm: lmValues,
      });
      console.log("Settings saved successfully", response.data);
    } catch (error) {
      console.error("Error saving settings: ", error);
    }
  };

  const handleCancel = () => {};

  const isButtonDisabled =!isValid;

  const validateLmValue = (value) => {
    const intValue = parseInt(value);
    return intValue >= 200 && intValue <= 1000;
  };

  const renderLmValueInput = (lmValue, index) => (
    <div key={index}>
      <label className="label">
        <div className="name">{`Lm${index + 1}:`}</div>
        <input
          className="input"
          type="text"
          value={lmValue}
          onChange={(e) => handleLmInputChange(index, e)}
          placeholder="Enter LM value"
          style={{ borderColor: isValid ? "initial" : "red" }}
          title={isValid ? "" : "Invalid value. Please enter an integer between 200 and 1000."}
        />
      </label>
    </div>
  );

  const handleLmInputChange = (index, e) => {
    const newValue = e.target.value;
    const isValidInput = validateLmValue(newValue);
    setIsValid(isValidInput);
    handleChangeLmValue(index, newValue);
  };

  const renderLmValueInputs = () => {
    return lmValues.map((lmValue, index) => renderLmValueInput(lmValue, index));
  };

  return (
    <div className="container">
      <div className="edit">Edit Settings</div>
      <div className="labelBox">
        <label className="label">
          <div
            className="name"
            value={numWells}
            onChange={handleChangeNumWells}
          >
            Number of Wells:
          </div>
          <select className="dropdown">
            <option className="dropdown-option" value={24}>
              24
            </option>
            <option className="dropdown-option" value={48}>
              48
            </option>
            <option className="dropdown-option" value={96} selected>
              96
            </option>
            <option className="dropdown-option" value={384}>
              384
            </option>
          </select>
        </label>

        <label className="label">
          <div className="name">Number of Wavelenghts:</div>
          <select
            className="dropdown"
            value={numWavelengths}
            onChange={handleChangeNumWavelengths}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        {/* {lmValues.map((lmValue, index) => (
          <div key={index}>
            <label className="label">
              <div className="name">{`Lm${index + 1}:`}</div>
              <input
                className="input"
                type="text"
                value={lmValue}
                onChange={(e) => handleLmInputChange(index, e)}
                style={{ borderColor: isValid ? "initial" : "red" }}
                title={
                  isValid
                    ? ""
                    : "Invalid value. Please enter an integer between 200 and 1000."
                }
              />
            </label>
          </div>
        ))} */}
        {renderLmValueInputs()}

      </div>

      <div className="buttons">
        <button disabled={isButtonDisabled} className="button" onClick={handleSave}>
          Ok
        </button>
        <Link to="/">
          <button className="button" onClick={handleCancel}>
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Settings;
