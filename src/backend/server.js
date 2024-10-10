// backend/index.js
require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
require('dotenv').config();

const app = express();
const PORT = 5002;

app.use(cors({ origin: '*' })); // Allow cross-origin requests
app.use(json()); // Parse JSON bodies

const uri = 

// Connect to MongoDB
import { connect } from 'mongoose';
console.log('MongoDB URI:', uri);

connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
