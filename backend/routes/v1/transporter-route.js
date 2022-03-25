const express = require("express");
const router = express.Router();

const { getTransporter } = require("../../controller/transporter-controller");

router.get("/transporter", getTransporter);
module.exports = router;
