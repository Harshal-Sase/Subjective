import React from "react";
import './Settings.css';
 
 
function Settings() {
  return (
    <div className="container">
        <div className="edit">Edit Settings</div>
            <div className="labelBox">
                <label className="label">
                    <div className="name">
                       
                        Number of Wells:
                        </div>
                        <div className="val">
                            <select className="dropdown">
                                <option className="dropdown-option" value="24">24</option>
                                <option className="dropdown-option" value="48">48</option>
                                <option className="dropdown-option" value="96" selected>96</option>
                                <option className="dropdown-option" value="384">384</option>
                            </select>
                        </div>
                </label>

                <label className="label">
                    <div className="name">
                    <h5>
                        Number of Wavelenghts:
                        </h5>
                        </div>
                        <div className="val">
                            <select className="dropdown">
                                <option className="dropdown-option" value="1" selected>1</option>
                                <option className="dropdown-option" value="2" >2</option>
                                <option className="dropdown-option" value="3">3</option>
                                <option className="dropdown-option" value="4">4</option>
                                <option className="dropdown-option" value="5">5</option>
                                <option className="dropdown-option" value="6">6</option>
                            </select>
                        </div>
                </label>

                <label className="label">
                    <div className="name">Lm1: </div>
                        <div className="val">
                            <input name="myInput" defaultValue="423" />
                        </div>
                </label>

                <label className="label">
                    <div className="name">Lm2: </div>
                        <div className="val">
                            <input name="myInput" defaultValue="585" />
                        </div>
                </label>
        </div>
            

        <button className="button">Ok</button>
        <button className="button">Cancel</button>
      
      

    </div>
 
  );
}
export default Settings;