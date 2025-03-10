const properties = [
  {
    title: "Modern Apartment in City Center",
    type: "Apartment",
    description: "A stylish 2-bedroom apartment located in the heart of the city with a beautiful skyline view.",
    price: 1200,
    location: {
      address: "Central Street 10",
      city: "Helsinki",
      state: "Uusimaa",
      zipCode: "00100",
    },
    squareFeet: 75,
    yearBuilt: 2015,
  },
  {
    title: "Cozy Family Home with Garden",
    type: "House",
    description: "A spacious family house with a large garden and a garage, perfect for a peaceful lifestyle.",
    price: 2500,
    location: {
      address: "Maple Avenue 5",
      city: "Espoo",
      state: "Uusimaa",
      zipCode: "02150",
    },
    squareFeet: 140,
    yearBuilt: 2005,
  },
  {
    title: "Luxury Penthouse with Sea View",
    type: "Penthouse",
    description: "A high-end penthouse offering stunning sea views, private balcony, and top-notch amenities.",
    price: 5000,
    location: {
      address: "Harbor Road 7",
      city: "Turku",
      state: "Southwest Finland",
      zipCode: "20100",
    },
    squareFeet: 180,
    yearBuilt: 2018,
  },
  {
    title: "Charming Country Cottage",
    type: "Cottage",
    description: "A traditional Finnish wooden cottage in a quiet countryside location, ideal for nature lovers.",
    price: 1500,
    location: {
      address: "Forest Lane 12",
      city: "Jyväskylä",
      state: "Central Finland",
      zipCode: "40100",
    },
    squareFeet: 90,
    yearBuilt: 1995,
  },
  {
    title: "Modern Studio Near University",
    type: "Studio",
    description: "A compact and modern studio apartment located just a few minutes from the university campus.",
    price: 800,
    location: {
      address: "Student Road 3",
      city: "Oulu",
      state: "Northern Ostrobothnia",
      zipCode: "90570",
    },
    squareFeet: 40,
    yearBuilt: 2020,
  },
];

module.exports = properties;
