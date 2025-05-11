require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
db.authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sync();
  })
  .then(() => console.log('Models synchronized'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/tasks.routes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Management API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
