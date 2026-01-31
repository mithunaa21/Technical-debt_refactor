const express = require("express");
const router = express.Router();
const { refactorCode } = require("../controllers/refactorController");

router.post("/", refactorCode);

module.exports = router;
