const express = require("express");
const router = express.Router();

const { getSource, getSources } = require("../../controller/source-controller");

router.get("/sources", getSources);
router.post("/source", getSource);
module.exports = router;
