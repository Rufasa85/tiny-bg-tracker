const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model 
class Play extends Model {}

Play.init(
  // Define fields/columns on model
  {
    joeScore: {
      type: DataTypes.INTEGER
    },
    arraScore: {
      type: DataTypes.INTEGER
    },
    playedOn:{
        type:DataTypes.DATE
    }
  },
  {
    // Link to database connection
    sequelize
  }
);

module.exports = Play;
