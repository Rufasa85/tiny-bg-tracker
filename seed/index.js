const {plays} = require("./playData");
const {notes} = require("./noteData");
const {games} = require("./gamesData");

const sequelize = require("../config/connection");
const {Game,Play,Note} = require("../models");

const seed = async ()=>{
    await sequelize.sync({force:true})
    await Game.bulkCreate(games);
    await Play.bulkCreate(plays);
    await Note.bulkCreate(notes);
}
seed();