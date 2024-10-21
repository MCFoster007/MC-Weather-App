import dotenv from 'dotenv';
import express from 'express';
import path from 'path'; 

dotenv.config();

// Import the routes
import routes from './routes/index.js';

console.log(process.env);
console.log("done");

const app = express();

const PORT = process.env.PORT || 3001;

// Serve static files from the client dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement middleware to connect the routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

