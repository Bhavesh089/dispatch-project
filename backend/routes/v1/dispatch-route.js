const express = require("express");
const router = express.Router();

const {
  createDispatch,
  updateDispatch,
  deleteDispatch,
  getDispatch,
} = require("../../controller/dispatch-controller");
const { authcheck } = require("../../middleware/authcheck");

router.post("/createdispatch", authcheck, createDispatch);
router.put("/updatedispatch", authcheck, updateDispatch);
router.delete("/deletedispatch", authcheck, deleteDispatch);
router.post("/getdispatch", getDispatch);
module.exports = router;
