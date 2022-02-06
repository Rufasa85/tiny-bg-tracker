const express = require("express");
const router = express.Router();
const { Game, Play, Note } = require("../../models")

router.get("/", async (req, res) => {
    try {
        const plays = await Play.findAll({
            include: [Game, Note]
        })
        res.json(plays)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const plays = await Play.findByPk(req.params.id, {
            include: [Game, Note]
        })
        res.json(plays)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})

router.post("/", async (req, res) => {
    try {
        const newData = await Play.create({
           joeScore:req.body.joeScore,
           arraScore:req.body.arraScore,
           playedOn:req.body.playedOn || new Date(),
           GameId:req.body.gameId
        })
        await Game.update({
            lastPlayed:req.body.playedOn || new Date(),
        },{
            where:{
                id:req.body.gameId
            }
        })
        res.json(newData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.put("/:id", async (req, res) => {
    try {
        const newData = await Play.update({
            joeScore:req.body.joeScore,
            arraScore:req.body.arraScore,
            playedOn:req.body.playedOn || new Date()
         }, {
            where: {
                id: req.params.id
            }
        })
        res.json(newData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const newData = await Play.destroy({
            where:{
                id: req.params.id
            }
        })
        res.json(newData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})

module.exports = router;