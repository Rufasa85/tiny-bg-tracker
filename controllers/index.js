const express = require("express");
const router = express.Router();
const apiRotues = require("./api") 

router.use("/api",apiRotues)

module.exports = router;