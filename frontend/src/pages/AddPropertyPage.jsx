import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

// eslint-disable-next-line react/prop-types
const AddPropertyPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Apartment");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationZipCode, setLocationZipCode] = useState("");
  const [squareFeet, setSquareFeet] = useState();
  const [yearBuilt, setYearBuilt] = useState();
  
  const navigate = useNavigate();
  
  const addProperty = async (newProperty) => {
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });
      if (!res.ok) {
        throw new Error("Failed to add property");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };
  
  const submitForm = (e) => {
    e.preventDefault();
    
    const newProperty = {
      title,
      type,
      description,
      price,
      location: {
        address: locationAddress,
        city: locationCity,
        state: locationState,
        zipCode: locationZipCode,
      },
      squareFeet,
      yearBuilt,
    };
    
    addProperty(newProperty);
    toast.success('Property added successfully');
    navigate("/");
  };
  
  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        <label>Property title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Property type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>
        
        <label>Property Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Price:</label>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Location Address:</label>
        <input
          type="text"
          required
          value={locationAddress}
          onChange={(e) => setLocationAddress(e.target.value)}
        />
        <label>Location City:</label>
        <input
          type="text"
          required
          value={locationCity}
          onChange={(e) => setLocationCity(e.target.value)}
        />
        <label>Location State:</label>
        <input
          type="text"
          required
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
        />
        <label>Location Zip Code:</label>
        <input
          type="text"
          required
          value={locationZipCode}
          onChange={(e) => setLocationZipCode(e.target.value)}
        />
        <label>Square Feet:</label>
        <input
          type="number"
          required
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />
        <label>Year Built:</label>
        <input
          type="number"
          required
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
        />
        <button>Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
