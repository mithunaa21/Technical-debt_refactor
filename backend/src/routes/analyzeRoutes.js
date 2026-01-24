const express = require("express");
const router = express.Router();
const { analyzeCode } = require("../controllers/analyzeController");

router.post("/", analyzeCode);

module.exports = router;
