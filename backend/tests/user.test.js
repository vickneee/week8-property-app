const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const api = supertest(app);

describe('User Authentication', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });
  
  describe('Sign Up', () => {
    it('should signup a new user with valid credentials', async () => {
      const userData = {
        name: 'John Doe',
        username: 'john_doe',
        password: 'PaXsFswRord123!',
        phone_number: '1234567890',
        profilePicture: 'https://example.com/profile.jpg',
        gender: 'Male',
        date_of_birth: '1990-01-01',
        role: 'user',
        address: {
          street: 'Main Street 123',
          city: 'Helsinki',
          state: 'Uusimaa',
          zipCode: '00100',
        },
      };
      
      const result = await api.post('/api/users/signup').send(userData);
      
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty('token');
      // // Verify user in database
      // const user = await User.findOne({username: userData.username});
      // expect(user).toBeTruthy();
    });
    
    it('should return 400 with missing required fields', async () => {
      const userData = {
        name: 'John Doe',
        username: 'john_doe',
        password: 'PaXsFswRord123!',
        phone_number: '1234567890',
        profilePicture: 'https://example.com/profile.jpg',
        // gender: 'Male', // Missing field
        date_of_birth: '1990-01-01',
        role: 'user',
        address: {
          street: 'Main Street 123',
          city: 'Helsinki',
          state: 'Uusimaa',
          zipCode: '00100',
        },
      };
      
      const result = await api.post('/api/users/signup').send(userData);
      
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty('error');
    });
    
    describe('Login', () => {
      it('should successfully login a user with valid credentials', async () => {
          const userData = {
            username: 'john_doe',
            password: 'PaXsFswRord123!',
          };
          
          const result = await api
          .post('/api/users/login')
          .send(userData);
          expect(result.status)
          .toBe(200);
          expect(result.body).toHaveProperty('token');
        });
      
      it('shouldn\'t login a user with invalid credentials', async () => {
        const userData = {
          username: 'john_doe',
          password: 'InvalidPassw!',
        };
        
        const result = await api.post('/api/users/login').send(userData);
        
        expect(result.status).toBe(400);
      });
    });
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });
  
});
