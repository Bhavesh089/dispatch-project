const express = require("express");
const router = express.Router();

const {
  createDispatch,
  updateDispatch,
  deleteDispatch,
  getDispatch,
} = require("../../controller/dispatch-controller");

router.post("/createdispatch", createDispatch);
router.put("/updatedispatch", updateDispatch);
router.delete("/deletedispatch", deleteDispatch);
router.post("/getdispatch", getDispatch);
module.exports = router;
