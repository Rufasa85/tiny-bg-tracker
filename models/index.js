const Game = require("./Game")
const Play = require("./Play")
const Note = require("./Note")

Game.hasMany(Play, {
    onDelete:"CASCADE"
});
Play.belongsTo(Game);

Game.hasMany(Note,{
    onDelete:"CASCADE"
});
Note.belongsTo(Game);

Play.hasMany(Note, {
    onDelete:"CASCADE"
});
Note.belongsTo(Play);

module.exports ={
    Game,
    Play,
    Note
}