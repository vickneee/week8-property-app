import { useState, useContext } from "react";
import AuthContext from '../context/AuthContext.jsx';

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext); // Correct placement: Top level
  
  const signup = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Signup failed:", responseData.error);
        setError(responseData.error);
        setIsLoading(false);
        return responseData;
      }
      
      setUser(responseData); // Use setUser from context
      localStorage.setItem("user", JSON.stringify(responseData)); //Keep localStorage as a fallback.
      setIsLoading(false);
      return responseData;
    } catch (err) {
      console.error("Signup failed:", err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
      return { error: "An unexpected error occurred." };
    }
  };
  
  return { signup, isLoading, error };
}
