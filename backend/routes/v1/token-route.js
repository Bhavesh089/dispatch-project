const express = require("express");
const router = express.Router();

const { generateToken } = require("../../middleware/authcheck");

router.post("/generatetoken", generateToken);
module.exports = router;
