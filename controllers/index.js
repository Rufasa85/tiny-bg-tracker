const express = require("express");
const router = express.Router();
const apiRotues = require("./api")
const moment = require("moment")
const { Game, Play, Note } = require("../models")

router.use("/api", apiRotues)

router.get("/", async(req, res) => {
    try {
        const games = await Game.findAll({
            include: [Note, Play],
            order: [
                ["lastPlayed", "asc"],
                ["name", "asc"]
            ]
        })
        const hbsGames = games.map(game => game.toJSON()).map(g => {
            return {
                ...g,
                lastPlayed: g.lastPlayed ? moment(g.lastPlayed).format("MM/DD/YYYY") : null,
                hasPlays: g.Plays.length > 0,
                numPlays: g.Plays.length,
                hasNotes: g.Notes.length > 0,
                numNotes: g.Notes.length
            }
        })
        console.log(hbsGames)
        res.render("index", { games: hbsGames })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})

module.exports = router;