# MERN Stack Property App

Metropolia UAS Exam practice repository. Property App.

---

## Data Model

Here's the property schema:

```javascript
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Short, descriptive name of the property
  type: { type: String, required: true }, // Property type, e.g., Apartment, House, Commercial
  description: { type: String, required: true }, // Detailed description of the property
  price: { type: Number, required: true }, // Cost of the property in relevant currency
  location: {
    address: { type: String, required: true }, // Street address of the property
    city: { type: String, required: true }, // City where the property is located
    state: { type: String, required: true }, // State or region of the property
    zipCode: { type: String, required: true } // Postal/ZIP code for the location
  },
  squareFeet: { type: Number, required: true }, // Total area of the property in square feet
  yearBuilt: { type: Number, required: true } // Year the property was constructed
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
```

---

## Usage

1. **Install Backend Dependencies**  
   
   - Rename the `.env.example` file to `.env` in the backend directory.
   - Navigate to the backend directory and install the necessary dependencies:
   ```sh
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
