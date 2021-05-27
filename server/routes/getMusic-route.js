// import dependencies and initialize the express router
const express = require("express");
const {
  index,
  insert,
} = require("../useCases/getMusicManagement/getMusicController");
const router = express.Router();

// define routes
router.get("/", index);
router.post("/", insert);

module.exports = router;
