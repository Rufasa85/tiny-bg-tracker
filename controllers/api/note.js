const express = require("express");
const router = express.Router();
const { Game, Play, Note } = require("../../models")

router.get("/", async (req, res) => {
    try {
        const notes = await Note.findAll({
            include: [Game, Play]
        })
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const notes = await Note.findByPk(req.params.id, {
            include: [Game, Play]
        })
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})

router.post("/", async (req, res) => {
    try {
        const newData = await Note.create(req.body)
        
        res.json(newData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error!", error })
    }
})
router.put("/:id", async (req, res) => {
    try {
        const newData = await Note.update(req.body, {
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
        const newData = await Note.destroy({
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