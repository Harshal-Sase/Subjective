// FormComponent.js
 
import React, { Component,useState, useEffect } from 'react';
import './FormComponent.css';
import axios from 'axios';

function FormComponent() {
    const [formData, setFormData] = useState({
      field1: 0,
      field2: 0,
      integerArray: [],
    });
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
   
    const handleSubmit = (e) => {
      e.preventDefault();
  axios.post('/save-to-db', formData)
        .then((response) => {
          console.log(response.data);
          // Handle success, e.g., show a success message to the user
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error, e.g., show an error message to the user
        });
    };
   
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Field 1:
          <input
            type="number"
            name="field1"
            value={formData.field1}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Field 2:
          <input
            type="number"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Integer Array:
          <input
            type="text"
            name="integerArray"
            value={formData.integerArray.join(',')}
            onChange={(e) => {
              const arrayValues = e.target.value.split(',').map((val) => parseInt(val.trim(), 10));
              setFormData((prevData) => ({
                ...prevData,
                integerArray: arrayValues,
              }));
            }}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );



//----------------------------------------------------------------------------------

// const [formData, setFormData] = useState({
//     field1: 0,
//     field2: 0,
//     integerArray: [],
//   });
 
//   useEffect(() => {
//     // Fetch earlier saved data from MongoDB when component mounts
//     axios.get('/get-data')
//       .then((response) => {
//         setFormData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., make a POST request to save data
//   };
 
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Field 1:
//         <input
//           type="number"
//           name="field1"
//           value={formData.field1}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Field 2:
//         <input
//           type="number"
//           name="field2"
//           value={formData.field2}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Integer Array:
//         <input
//           type="text"
//           name="integerArray"
//           value={formData.integerArray.join(',')}
//           onChange={(e) => {
//             const arrayValues = e.target.value.split(',').map((val) => parseInt(val.trim(), 10));
//             setFormData((prevData) => ({
//               ...prevData,
//               integerArray: arrayValues,
//             }));
//           }}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );


//____________________________________________________________________________________________________________________

}

export default FormComponent;