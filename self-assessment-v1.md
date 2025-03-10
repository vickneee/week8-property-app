# Self-Assessment for Frontend Code of AddPropertyPage.jsx

Improvements and Refactoring
Here's a breakdown of the improvements we'll make:
Custom useField Hook: We'll create a reusable hook to handle the state, change events, and validation for each form
field.
Clearer Form Submission: Improve the feedback loop after submitting the form.
Code style improvements: Code style can be improved a little bit.
Simplify the submitForm: Logic can be simplified.

```javascript
import {useState} from "react";
import {useNavigate} from "react-router-dom";
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

```

## Improvements and Refactoring

Here's a breakdown of the improvements we'll make:
- Custom useField Hook: We'll create a reusable hook to handle the state, change events, and validation for each form field.
- Clearer Form Submission: Improve the feedback loop after submitting the form.
- Code style improvements: Code style can be improved a little bit.
- Simplify the submitForm: Logic can be simplified.

### 1. Create the useField Hook (create new file useField.js)

```js
import {useState} from 'react';

const useField = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  
  const onChange = (event) => {
    setValue(event.target.value);
    setError(null);
  };
  
  const clear = () => {
    setValue('');
    setError(null);
  }
  
  const validate = (validationFunc) => {
    const validationResult = validationFunc(value);
    setError(validationResult);
    return !validationResult;
  };
  
  return {
    type,
    value,
    onChange,
    clear,
    error,
    validate
  };
};

export default useField;
```

### 2. Update AddPropertyPage.jsx

```js
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import useField from '../../hooks/useField'; // Import the useField hook

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
```

**Key Improvements:**

- We've created a custom useField hook to handle the state, change events, and validation for each form field. This makes the code cleaner and more reusable.
- We've added a clear method to the useField hook to reset the field value and error state.
- We've added a validate method to the useField hook to handle field validation.
- We've updated the submitForm function to use the new useField hook for each form field.

**Lessons Learned:**

By using the custom useField hook, we've simplified the code and made it more maintainable. The useField hook can be reused in other components to handle form fields with consistent behavior.
