'use strict';

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');

const connectString =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sussybaka';

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    // optional tuning
    mongoose.set('strictQuery', false);
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', { color: true });
    }

    try {
      await mongoose.connect(connectString, {
        maxPoolSize: 10, // tweak as needed
      });
      console.log('✅ MongoDB connected');
      if (typeof countConnect === 'function') countConnect();
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1);
    }

    // graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  }

  static getInstance() {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }
}

module.exports = Database.getInstance();
