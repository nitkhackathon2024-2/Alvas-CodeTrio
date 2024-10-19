const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const postRoute = require('./routes/postRoute');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Use CORS
app.use(express.json());


// MongoDB Connection (cleaned up deprecated options)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.use('/posts', postRoute); 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
