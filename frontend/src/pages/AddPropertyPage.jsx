import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import useField from '../hooks/useField'; // Import the useField hook

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Using the useField hook for each field
  const title = useField('text', '');
  const type = useField('select', 'Apartment');
  const description = useField('textarea', '');
  const price = useField('number', '');
  const locationAddress = useField('text', '');
  const locationCity = useField('text', '');
  const locationState = useField('text', '');
  const locationZipCode = useField('text', '');
  const squareFeet = useField('number', '');
  const yearBuilt = useField('number', '');
  
  const clearAllFields = () => {
    title.clear();
    type.clear();
    description.clear();
    price.clear();
    locationAddress.clear();
    locationCity.clear();
    locationState.clear();
    locationZipCode.clear();
    squareFeet.clear();
    yearBuilt.clear();
  };
  
  const addProperty = async (newProperty) => {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add property');
      }
      
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.message ||
        'Failed to add property. Check console for more info.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newProperty = {
      title: title.value,
      type: type.value,
      description: description.value,
      price: Number(price.value),
      location: {
        address: locationAddress.value,
        city: locationCity.value,
        state: locationState.value,
        zipCode: locationZipCode.value,
      },
      squareFeet: Number(squareFeet.value),
      yearBuilt: Number(yearBuilt.value),
    };
    
    const success = await addProperty(newProperty);
    if (success) {
      toast.success('Property added successfully');
      clearAllFields();
      navigate('/');
    }
  };
  
  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        <label>Property title:</label>
        <input {...title} required/>
        <label>Property type:</label>
        <select {...type}>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>
        <label>Property Description:</label>
        <textarea {...description} required/>
        <label>Price:</label>
        <input {...price} required/>
        <label>Location Address:</label>
        <input {...locationAddress} required/>
        <label>Location City:</label>
        <input {...locationCity} required/>
        <label>Location State:</label>
        <input {...locationState} required/>
        <label>Location Zip Code:</label>
        <input {...locationZipCode} required/>
        <label>Square Feet:</label>
        <input {...squareFeet} required/>
        <label>Year Built:</label>
        <input {...yearBuilt} required/>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
