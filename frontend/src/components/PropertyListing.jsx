// eslint-disable-next-line react/prop-types
const PropertyListing = ({property}) => {
  return (
    <div className="property-preview">
      <h2>{property.title}</h2>
      <p>Type: {property.type}</p>
      <p>Description: {property.description}</p>
      <p>Price: {property.price}</p>
    </div>
  );
};

export default PropertyListing;
