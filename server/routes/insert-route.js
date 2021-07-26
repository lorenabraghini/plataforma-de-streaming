// import dependencies and initialize the express router
const express = require("express");
const { index } = require("../useCases/insertManagement/insertController");
const router = express.Router();

// define routes
router.post("/", index);

module.exports = router;
