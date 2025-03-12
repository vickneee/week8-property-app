# MERN Stack Property App

Metropolia UAS Week 8 practice repository. Property App. 

---

## Data Models

### Property Model

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

### User Model


```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true }, // Full name of the user
    username: { type: String, required: true, unique: true }, // Unique username for login
    password: { type: String, required: true }, // Hashed password for authentication
    phone_number: { type: String, required: true }, // Contact phone number
    profilePicture: { type: String, required: false }, // URL of the user's profile picture
    gender: { type: String, required: true }, // Gender of the user
    date_of_birth: { type: Date, required: true }, // User's birth date
    role: { type: String, required: true, enum: ['admin', 'user', 'moderator'], default: 'user' }, // User role
    address: {
      street: { type: String, required: true }, // Street address
      city: { type: String, required: true }, // City
      state: { type: String, required: true }, // State or region
      zipCode: { type: String, required: true } // Postal/ZIP code
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
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
