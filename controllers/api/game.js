const express = require("express");
const router = express.Router();
const { Game, Play, Note } = require("../../models")

router.get("/", async (req, res) => {
    try {
        const games = await Game.findAll({
            include: [Play, Note],
            order: [["lastPlayed", "asc"]]
        })
        res.json(games)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const games = await Game.findByPk(req.params.id, {
            include: [ Note, {
                model:Play,
                include:[Note]
            }]
        })
        res.json(games)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})

router.post("/", async (req, res) => {
    try {
        const newData = await Game.create({
            name: req.body.name
        })
        res.json(newData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.put("/:id", async (req, res) => {
    try {
        const newData = await Game.update({
            name: req.body.name
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
        const newData = await Game.destroy({
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