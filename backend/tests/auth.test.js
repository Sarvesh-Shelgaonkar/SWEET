// Set environment variables FIRST
process.env.JWT_SECRET = 'test_jwt_secret_key';
process.env.JWT_EXPIRES_IN = '1h';

const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');

// Create express app for testing
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('../src/routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Test Error:', err);
  res.status(500).json({ message: err.message });
});


const MONGO_TEST_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop_test';

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});

afterAll(async () => 
{
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => 
{
  await User.deleteMany({});
});

test('register then login', async () => 
{
  const registerResp = await request(app)
    .post('/api/auth/register')
    .send({ email: 'a@b.com', password: 'pass123', name: 'Tester' });
  expect(registerResp.status).toBe(201);

  const loginResp = await request(app)
    .post('/api/auth/login')
    .send({ email: 'a@b.com', password: 'pass123' });
  expect(loginResp.status).toBe(200);
  expect(loginResp.body.access_token).toBeTruthy();
});

test('duplicate register fails', async () => {
  await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'p' });
  const resp = await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'p' });
  expect(resp.status).toBe(409);
});
