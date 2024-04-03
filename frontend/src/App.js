import React from 'react';
 
function App() {
  const handleSettingClick = () => {
fetch('http://localhost:8090/setting')
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
 
  const handleViewClick = () => {
fetch('http://localhost:8090/view')
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
 
  return (
    <div>
      <h1>Welcome to the Web App!</h1>
      <button onClick={handleSettingClick}>Setting</button>
      <button onClick={handleViewClick}>View</button>
    </div>
  );
}
 
export default App;