import React from "react";
import "./Startup.css";
import {Link } from "react-router-dom";

const Startup = () => {
  return (
    <div className="container">
      <container>
        <Link to="/setting">
          <button className="button">Settings...</button>
        </Link>

        <button className="button">Acquire Data!</button>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <th>Well Index</th>
              <th>Wavelength Values</th>
            </thead>
            <tbody>
              <tr>
                <td>1,1</td>
                <td>1,2</td>
              </tr>
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
