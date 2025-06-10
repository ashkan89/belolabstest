// Import the mongoose library, which is a popular Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');

const connectDB = async () => {
  // Retrieve the MongoDB connection string from the environment variables.
  // This is the most secure way to handle credentials, as they are not hardcoded in your source code.
  // The 'MONGODB_URI' variable is passed from your docker-compose.yml file.
  const mongoURL = process.env.MONGODB_URI;

  // It's a good practice to check if the environment variable is actually set.
  // If it's not, we log an error and exit the application to prevent it from running in a misconfigured state.
  if (!mongoURL) {
    console.error('FATAL ERROR: MONGODB_URI environment variable is not set.');
    process.exit(1); // Exit the process with an error code
  }

  // --- Main Connection Logic ---
  // We call mongoose.connect() with the URL. Mongoose handles the parsing of the username,
  // password, host, port, and database name from this single string.
  // Modern versions of Mongoose do not require the { useNewUrlParser: true, useUnifiedTopology: true } options.
  console.log('Attempting to connect to MongoDB...');

  mongoose.connect(mongoURL)
    .then(() => {
      // The .then() block is executed if the connection is successful.
      console.log('MongoDB connected successfully!');
      // Now that you are connected, you can start defining your schemas and models here,
      // or start your Express server.
    })
    .catch(err => {
      // The .catch() block is executed if there is an error during the initial connection.
      console.error('MongoDB connection error:', err);
      // Exit the process if we can't connect to the database, as the app is likely unusable.
      process.exit(1);
    });

  // You can also listen for events on the connection object for more advanced scenarios,
  // like handling disconnection or reconnection events.
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected.');
  });
};

module.exports = connectDB;