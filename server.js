const express = require('express');
const { authMiddleware } = require('./utils/auth');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: '../.env' });
const db = require('./config/db');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchronize Sequelize models with MySQL database
sequelize.sync({ force: true }).then(() => {
  console.log('MySQL database and tables created');
});

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs, // GraphQL type definitions
  resolvers, // GraphQL resolvers
  context: authMiddleware, // Custom middleware function for authentication
});

// Serve the React app in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start the Apollo server
server.start().then(() => {
  // Apply Apollo middleware to the express app
  server.applyMiddleware({ app });
  
  // Start the express server
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${process.env.PORT || 3001}`);
    console.log(`GraphQL endpoint: ${server.graphqlPath}`);
  });
});
