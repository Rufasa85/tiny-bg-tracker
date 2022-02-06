const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model 
class Note extends Model {}

Note.init(
  // Define fields/columns on model
  {
    text: {
      type: DataTypes.TEXT
    },
    
  },
  {
    // Link to database connection
    sequelize
  }
);

module.exports = Note;
