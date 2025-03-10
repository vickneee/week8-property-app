import { useEffect, useState } from "react";
import PropertyListings from "../components/PropertyListings.jsx";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("api/properties");
        
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setProperties(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    // setTimeout(() => {fetchProperties();}, 1000); // Delay of 1 second
    fetchProperties();
  }, []);
  
  return (
    <div className="home">
      {error && <div className="margin-b">{error}</div>}
      {isPending && <div>Loading...</div>}
      {properties && <PropertyListings properties={properties} />}
    </div>
  );
};

export default Home;
