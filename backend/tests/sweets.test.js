// Set environment variables FIRST
process.env.JWT_SECRET = 'test_jwt_secret_key';
process.env.JWT_EXPIRES_IN = '1h';

const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

// Create express app for testing
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Add routes without global auth middleware for testing
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/sweets', require('../src/routes/sweets'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Test Error:', err);
  res.status(500).json({ message: err.message });
});


const MONGO_TEST_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop_test';

let adminToken;

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
  await User.deleteMany({});
  const pw = await User.hashPassword('adminpass');
  const admin = await User.create({ email: 'admin@a.com', password: pw, isAdminRole: true });
  const login = await request(app).post('/api/auth/login').send({ email: 'admin@a.com', password: 'adminpass' });
  adminToken = login.body.access_token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

test('admin can create sweet', async () => {
  const resp = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ name: 'Rasgulla', category: 'indian', price: 10, stock: 5, description: 'Sweet cottage cheese balls' });
  expect(resp.status).toBe(201);
  expect(resp.body.name).toBe('Rasgulla');
});
