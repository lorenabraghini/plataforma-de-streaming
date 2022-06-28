// import dependencies and initialize the express router
const express = require("express");
const { index } = require("../useCases/getUserManagement/getUserController");
const router = express.Router();

// define routes
router.post("/", index);

module.exports = router;
