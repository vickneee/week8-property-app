const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Your Express app
const Property = require('../models/propertyModel');

// Create a new instance of the supertest agent
const api = supertest(app);

const properties = [
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

describe('Property Controller', () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });
  
  // Test GET /api/properties
  it('should return all properties as JSON when GET /api/properties is called', async () => {
      const response = await api.get('/api/properties').
        expect(200).
        expect('Content-Type', /application\/json/);
      
      expect(response.body).toHaveLength(properties.length);
    });
  
  // Test POST /api/properties
  it('should create a new property when POST /api/properties is called', async () => {
    const newProperty =  {
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
      }
    
    await api.post('/api/properties').
      send(newProperty).
      expect(201).
      expect('Content-Type', /application\/json/);
    
    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyNames = propertiesAfterPost.map((property) => property.title);
    expect(propertyNames).toContain(newProperty.title);
  });
  
  // Test GET /api/properties/:id
  it(
    'should return one property by ID when GET /api/properties/:id is called',
    async () => {
      const property = await Property.findOne();
      
      await api.get(`/api/properties/${property._id}`).
        expect(200).
        expect('Content-Type', /application\/json/);
    },
  );
  
  it('should return 404 for a non-existing property ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    
    await api.get(`/api/properties/${nonExistentId}`).expect(404);
  });
  
  // Test PUT /api/properties/:id
  it(
    'should update one property with partial data when PUT /api/properties/:id is called',
    async () => {
      const property = await Property.findOne();
      const updatedProperty = {
        title: 'Updated Property Info',
        type: 'Commercial',
      };
      
      await api.put(`/api/properties/${property._id}`).
        send(updatedProperty)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      const updatedPropertyCheck = await Property.findById(property._id);
      expect(updatedPropertyCheck.title).toBe(updatedProperty.title);
      expect(updatedPropertyCheck.type).toBe(updatedProperty.type);
    },
  );
  
  it(
    'should return 404 for invalid property ID when PUT /api/properties/:id', async () => {
      const invalidId = '12345';
      
      await api.put(`/api/properties/${invalidId}`).send({}).expect(404);
    });
  
  // Test DELETE /api/properties/:id
  it(
    'should delete one property by ID when DELETE /api/properties/:id is called',
    async () => {
      const property = await Property.findOne();
      
      await api.delete(`/api/properties/${property._id}`).expect(204);
      
      const deletedPropertyCheck = await Property.findById(property._id);
      expect(deletedPropertyCheck).toBeNull();
    },
  );
  
  it(
    'should return 404 for invalid property ID when DELETE /api/properties/:id',
    async () => {
      const invalidId = '12345';
      
      await api.delete(`/api/properties/${invalidId}`).expect(404);
    },
  );
});

afterAll(() => {
  mongoose.connection.close();
});
