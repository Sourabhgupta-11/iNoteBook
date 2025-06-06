const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL; 

if (!mongoURL) {
  console.error('❌ MONGO_URI not set in environment variables');
  process.exit(1); 
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('⚠️ Disconnected from MongoDB');
});

module.exports = db;
