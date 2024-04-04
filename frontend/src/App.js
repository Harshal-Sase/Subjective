import React from 'react';
import './App.css';
import Settings from './component/Settings';
import { BrowserRouter as Router, Route,Link, Routes} from 'react-router-dom';
 
function App() {


  return (
    <Router>
    <div className='container'>
      <container>
        {/* <Link to="/Settings"> */}
        <button className='button' onClick={()=><Settings/>}>Settings...</button>
        {/* </Link> */}
        <button className='button'>Acquire Data!</button>
      <div className='tableContainer'>
        <table className='table'>
          <thead>
            <th>Well Index</th>
            <th>Wavelength Values</th>
          </thead>
          <tbody>
            <tr>
              <td>1,1</td>
              <td>1,2</td>
            </tr>
            <tr>
              <td>1,1</td>
              <td>1,2</td>
            </tr>
            <tr>
              <td>1,1</td>
              <td>1,2</td>
            </tr>
            <tr>
              <td>1,1</td>
              <td>1,2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className='button'>OK</button>
      <button className='button'>Cancel</button>
      </container>
    </div>
    <Routes>
      <Route path='/Settings' Component={Settings}/>
    </Routes> 
    </Router>
    //<Settings/>
  );
}
 
export default App;



