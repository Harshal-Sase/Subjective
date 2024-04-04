import React, { useState } from 'react';
import './Settings.css';
 
 
const Settings = () => {

    const [numWells, setNumWells] = useState(96);
  const [numWavelengths, setNumWavelengths] = useState(1);
  const [lmValues, setLmValues] = useState(Array.from({ length: numWavelengths }, () => ''));
  const [isValid, setIsValid] = useState(true);
 
  const handleChangeNumWells = (e) => {
    setNumWells(parseInt(e.target.value));
  };
 
  const handleChangeNumWavelengths = (e) => {
    const value = parseInt(e.target.value);
    setNumWavelengths(value);
    setLmValues(Array.from({ length: value }, () => ''));
  };
 
  const handleChangeLmValue = (index, value) => {
    const newLmValues = [...lmValues];
    newLmValues[index] = value;
    setLmValues(newLmValues);
  };
 
  const handleSave = () => {
    // Save settings logic here
  };
 
  const handleCancel = () => {
    // Cancel changes logic here
  };
 
  const validateLmValue = (value) => {
    const intValue = parseInt(value);
    return intValue >= 200 && intValue <= 1000;
  };
 
  const handleLmInputChange = (index, e) => {
    const newValue = e.target.value;
    const isValidInput = validateLmValue(newValue);
    setIsValid(isValidInput);
    handleChangeLmValue(index, newValue);
  };


  return (
    <div className="container">
        <div className="edit">Edit Settings</div>
            <div className="labelBox">
                <label className="label">
                    <div className="name" value={numWells} onChange={handleChangeNumWells}>
                        Number of Wells:
                        </div>
                        <select className="dropdown">
                                <option className="dropdown-option" value={24}>24</option>
                                <option className="dropdown-option" value={48}>48</option>
                                <option className="dropdown-option" value={96} selected>96</option>
                                <option className="dropdown-option" value={384}>384</option>
                        </select>
                </label>

                <label className="label">
                    <div className="name">
                        Number of Wavelenghts:                     
                        </div>
                            <select className="dropdown" value={numWavelengths} onChange={handleChangeNumWavelengths}>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <option key={num} value={num}>
                                        {num}
                                        </option>
                                        ))}
                            </select>
                </label>


{lmValues.map((lmValue, index) => (
        <div key={index}>
          <label className="label">
            <div className='name'>
            {`Lm${index + 1}:`}
            </div>
          <input className='input'
            type="text"
            value={lmValue}
            onChange={(e) => handleLmInputChange(index, e)}
            style={{ borderColor: isValid ? 'initial' : 'red' }}
            title={isValid ? '' : 'Invalid value. Please enter an integer between 200 and 1000.'}
          />
          </label>
        </div>
      ))}
        </div>
            
<div className="buttons">
        <button className="button" onClick={handleSave}>Ok</button>
        <button className="button" onClick={handleCancel}>Cancel</button>
</div>
      
      

    </div>
 
  );
}
export default Settings;