// import dependencies and initialize the express router
const express = require("express");
const {
  index,
} = require("../useCases/getAlbunsManagement/getAlbunsController");
const router = express.Router();

// define routes
router.get("/", index);

module.exports = router;
