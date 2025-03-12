import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';

const PropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { token } = useContext(AuthContext);

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
      return true; // Return true if successful
    } catch (error) {
      console.error("Error deleting property!", error);
      toast.error("Error deleting property!");
      return false; // Return false if failed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("id: ", id);
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const onDeleteClick = (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + propertyId
    );
    if (!confirm) return;

    const deletionSuccess = deleteProperty(propertyId);
    if (!deletionSuccess) {
    toast.success("Property Deleted Successfully!");
    navigate("/");
    }
  };

  return (
    <div className="property-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{property.title}</h2>
          <p>Type: {property.type}</p>
          <p>Description: {property.description}</p>
          <p>Price: {property.price}</p>
          <p>Location Address: {property.location.address}</p>
          <p>Location City: {property.location.city}</p>
          <p>Location State: {property.location.state}</p>
          <p>Location Zip Code: {property.location.zipCode}</p>
          <p>Square Feet: {property.squareFeet}</p>
          <p>Year Built: {property.yearBuilt}</p>
          <div className="align-row">
          <Link to={`/edit-property/${id}`} className="btn"> Edit </Link>
          <Link to="/" onClick={() => onDeleteClick(property._id)} className="btn">Delete</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyPage;
