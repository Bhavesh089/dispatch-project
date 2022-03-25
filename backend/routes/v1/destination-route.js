const express = require("express");
const router = express.Router();

const { getDestination } = require("../../controller/destination-controller");

router.post("/destination", getDestination);
module.exports = router;
