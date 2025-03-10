import {Link} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PropertyListings = ({properties}) => {
  
  if (!properties) {
    return <div>No properties available</div>;
  }
  
  return (
    <div className="property-list">
      {/* eslint-disable-next-line react/prop-types */}
      {properties.map((property) => (
        
        <div className="property-preview" key={property.id}>
          <h2>{property.title}</h2>
          <p>Type: {property.type}</p>
          <p>Price: {property.price}</p>
          <div className="align-row">
            <Link to={`/properties/${property.id}`} className="btn">
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyListings;
