import React, { useState, useEffect } from 'react';
import "./Startup.css";
import { Link } from "react-router-dom";

const Startup = () => {


  const [numbersCol1, setNumbersCol1] = useState([]);
  const [numbersCol2, setNumbersCol2] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
 
  useEffect(() => {
    let intervalId;
   
    if (isGenerating) {
      intervalId = setInterval(generateNumbers, 1000); // Adjust the interval as needed
    } else {
      clearInterval(intervalId);
    }
   
    return () => clearInterval(intervalId);
  }, [isGenerating]);
 
  const generateNumbers = () => {
    const nextNumber1 = numbersCol1.length + 1;
    const nextNumber2 = nextNumber1 * 2;
   
    setNumbersCol1(prevNumbers => [...prevNumbers, prevNumbers.length+1]);
    setNumbersCol2(prevNumbers => [...prevNumbers, (prevNumbers.length+1)*2]);
  };
 
  const toggleGeneration = () => {
    setIsGenerating(prevIsGenerating => !prevIsGenerating);
  };
 
  const buttonLabel = isGenerating ? "Stop Acquiring" : "Acquire Data!";

  return (
    <div className="container">
      <container>
        <Link to="/settings">
          <button className="button">Settings...</button>
        </Link>

        <button className="button"onClick={toggleGeneration}>{buttonLabel}</button>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <th>Well Index</th>
              <th>Wavelength Values</th>
            </thead>
            <tbody>
            {numbersCol1.map((number, index) => (
            <tr key={index}>
              <td>{number}</td>
              <td>{numbersCol2[index]}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
        <button className="button">OK</button>
        <button className="button">Cancel</button>
      </container>
    </div>
  );
};

export default Startup;
