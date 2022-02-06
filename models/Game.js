const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model 
class Game extends Model {}

Game.init(
  // Define fields/columns on model
  {
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastPlayed:{
        type:DataTypes.DATE
    }
  },
  {
    // Link to database connection
    sequelize
  }
);

module.exports = Game;
