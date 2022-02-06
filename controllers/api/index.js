const express = require("express");
const router = express.Router();
const gamesRoutes = require("./game") 
const playsRoutes = require("./play") 
const notesRoutes = require("./note") 

router.use("/games",gamesRoutes)
router.use("/plays",playsRoutes)
router.use("/notes",notesRoutes)

module.exports = router;