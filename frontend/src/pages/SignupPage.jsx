import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const SignupPage = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const profilePicture = useField("text");
  const [selectedGender, setSelectedGender] = useState('Male');
  const dateOfBirth = useField("date");
  const [selectedRole, setSelectedRole] = useState("user");
  const addressStreet = useField("text");
  const addressCity = useField("text");
  const addressState = useField("text");
  const addressZipCode= useField("text");
  const [validationError, setValidationError] = useState(null); // Client side validation error state
  
  const { signup } = useSignup("/api/users/signup");
  
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  
  const handleSelectedRoleChange = (e) => {
    setSelectedRole(e.target.value);
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.value || !username.value || !password.value || !phoneNumber.value || !selectedGender || !dateOfBirth.value || !selectedRole || !addressStreet || !addressCity || !addressState || !addressZipCode) {
      setValidationError('Please provide all the required fields!!!');
      toast.error('Please provide all the required fields!!!');
      return;
    }
    
    setValidationError(null); // Clear validation error
    
    try {
      const user = await signup({
        name: name.value,
        username: username.value,
        password: password.value,
        phone_number: phoneNumber.value,
        profilePicture: profilePicture.value,
        gender: selectedGender,
        date_of_birth: dateOfBirth.value,
        role: selectedRole,
        address: {
          street: addressStreet.value,
          city: addressCity.value,
          state: addressState.value,
          zipCode: addressZipCode.value,
        },
      });
      if (user) { // Check if user exists instead of error
        console.log('Signup successful!');
        toast.success('Signup successful!');
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      toast.error('Signup failed!');
    }
  };
  
  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        {validationError && <p className="error">{validationError}</p>} {/* Display validation error */}
        <label>Name:</label>
        <input {...name} />
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <label>Gender:</label>
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Membership Status:</label>
        <select value={selectedRole} onChange={handleSelectedRoleChange}>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
        <label>Address Street:</label>
        <input{...addressStreet}/>
        <label>Address City:</label>
        <input{...addressCity}/>
        <label>Address State:</label>
        <input{...addressState}/>
        <label>Address Zip Code:</label>
        <input{...addressZipCode}/>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default SignupPage;
