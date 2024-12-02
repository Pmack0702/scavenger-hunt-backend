const express = require('express'); // Import Express framework to create the server and handle routes.
const mongoose = require('mongoose'); // Import Mongoose to connect and interact with the MongoDB
const cors = require('cors'); // Import CORS to handle cross-origin resource sharing.
const dotenv = require('dotenv'); // dotenv to load environment variables
dotenv.config(); // Load variables from .env file

const poiRoutes = require('./routes/POImanagement/POImanagement');
const teamRoutes = require('./routes/TeamManagement/teammanagement');

const SERVER_PORT = process.env.port || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express(); // Create an instance of the Express application.


// Middleware configuration
app.use(cors()); // Enable CORS to allow requests from different origins (e.g., frontend).
app.use(express.json()); // Enable JSON parsing for incoming requests (e.g., reading request bodies).

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,  
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));


app.use('/api/v1', poiRoutes);
app.use('/api/v1', teamRoutes);
// app.use('/api/v1', teamRoutes)

app.listen(SERVER_PORT, () => {
    console.log("The server is running is on port 3000")
})