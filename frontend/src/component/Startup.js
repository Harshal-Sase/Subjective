import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Startup.css";

const Startup = () => {
  const [isAcquiringData, setIsAcquiringData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isSettingsDisabled, setIsSettingsDisabled] = useState(false);
  const [isOkDisabled, setIsOkDisabled] = useState(false);
  const continueAcquiringRef = useRef(true);

  useEffect(() => {
    setIsSettingsDisabled(isAcquiringData);
    setIsOkDisabled(isAcquiringData);
  }, [isAcquiringData]);

  const handleAcquireData = async () => {
    try {
      setIsAcquiringData(true);
      setIsSettingsDisabled(true);
      setIsOkDisabled(true);

      const response = await fetch("http://localhost:8090/settings");
      const data = await response.json();
      const newData = [];
      for (
        let i = 1;
        i <= data.NoOfWells && continueAcquiringRef.current;
        i++
      ) {
        newData.push({
          wellIndex: i,
          wavelengthValues: data.Lm.map((value) => i + value / 10).join(", "),
        });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        setTableData([...newData]);
      }
    } catch (error) {
      console.error("Error acquiring data:", error);
    } finally {
      setIsSettingsDisabled(false);
      setIsOkDisabled(false);
      continueAcquiringRef.current = true;
    }
  };

  const handleStopAcquiring = () => {
    setIsAcquiringData(false);
    continueAcquiringRef.current = false;
  };

  return (
    <div className="container">
      <container>
        <Link to="/settings">
          <button className="button" disabled={isSettingsDisabled}>
            Settings...
          </button>
        </Link>
        {isAcquiringData ? (
          <button
            type="button"
            className="button"
            onClick={handleStopAcquiring}
          >
            Stop Acquiring
          </button>
        ) : (
          <button type="button" className="button" onClick={handleAcquireData}>
            Acquire Data!
          </button>
        )}
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Well Index</th>
                <th>Wavelength Values</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ wellIndex, wavelengthValues }) => (
                <tr key={wellIndex}>
                  <td>{wellIndex}</td>
                  <td>{wavelengthValues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="button" disabled={isOkDisabled}>
          OK
        </button>
        <button className="button">Cancel</button>
      </container>
    </div>
  );
};

export default Startup;
