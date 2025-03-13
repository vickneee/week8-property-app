import {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import {toast} from 'react-toastify';

const EditPropertyPage = () => {
  const [property, setProperty] = useState(null); // Initialize property state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const {id} = useParams();
  
  // Declare state variables for form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationState, setLocationState] = useState('');
  const [locationZipCode, setLocationZipCode] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  
  const navigate = useNavigate();
  
  const {token} = useContext(AuthContext);
  
  const updateProperty = async (property) => {
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(property),
      });
      if (!res.ok)
        throw new Error('Failed to update property');
      return res.ok;
    } catch (error) {
      console.error('Error updating property:', error);
      return false;
    }
  };
  
  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setProperty(data); // Set the property data
        
        // Initialize form fields with fetched property data
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setPrice(data.price);
        setLocationAddress(data.location.address);
        setLocationCity(data.location.city);
        setLocationState(data.location.state);
        setLocationZipCode(data.location.zipCode);
        setSquareFeet(data.squareFeet);
        setYearBuilt(data.squareFeet);
      } catch (error) {
        console.error('Failed to fetch property:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    
    fetchProperty();
  }, [id]);
  
  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    
    const updatedProperty = {
      id,
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
    
    const success = await updateProperty(updatedProperty);
    if (success) {
      toast.success('Property Updated Successfully!');
      console.log('Property Updated Successfully!');
      navigate(`/properties/${id}`);
    }
    else {
      toast.error('Failed to update the property');
      console.error('Failed to update the property');
    }
  };
  
  return (
    <div className="create">
      <h2>Update Property</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Property title:</label>
          <input type="text" required value={title}
                 onChange={(e) => setTitle(e.target.value)}/>
          <label>Property type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
          </select>
          <label>Property Description:</label>
          <textarea required value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
          <label>
            Price:
            <input type="number" required value={price}
                   onChange={(e) => setPrice(e.target.value)}/>
          </label>
          <label>
            Location Address:
            <input type="text" required value={locationAddress}
                   onChange={(e) => setLocationAddress(e.target.value)}/>
          </label>
          <label>
            Location City:
            <input type="text" required value={locationCity}
                   onChange={(e) => setLocationCity(e.target.value)}/>
          </label>
          <label>
            Location State:
            <input type="text" required value={locationState}
                   onChange={(e) => setLocationState(e.target.value)}/>
          </label>
          <label>
            Location Zip Code:
            <input type="text" required value={locationZipCode}
                   onChange={(e) => setLocationZipCode(e.target.value)}/>
          </label>
          <label>
            Square Feet:
            <input type="number" required value={squareFeet}
                   onChange={(e) => setSquareFeet(e.target.value)}/>
          </label>
          <label>
            Year Built:
            <input type="number" required value={yearBuilt}
                   onChange={(e) => setYearBuilt(e.target.value)}/>
          </label>
          <button>Update Property</button>
        </form>
      )}
    </div>
  );
};

export default EditPropertyPage;
