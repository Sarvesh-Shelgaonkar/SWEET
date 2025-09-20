const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');

let server;

module.exports = {
  getApp: () => app,
  request,
  async connect(uri) {
    await mongoose.connect(uri);
  },
  async close() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};
