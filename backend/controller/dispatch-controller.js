const { httpCodes } = require("../config/config.json");
const {
  createDispatchModel,
  updateDispatchModel,
  deleteDispatchModel,
  getDispatchModel,
} = require("../models/dispatch-mode");

exports.createDispatch = (req, res) => {
  var data = req.body;

  console.log(req.body, "this is data------->");
  var responseData = {
    success: false,
    msg: "invalid params",
  };
  //check if it has valid parameters
  if (
    data.deliveryNum &&
    data.destCode &&
    data.sourceCode &&
    data.vechileNumber &&
    data.transporter &&
    data.startDate &&
    data.endDate
  ) {
    console.log(data, "in-->");
    createDispatchModel(data, (err, result) => {
      if (err) {
        console.log(err);
        if ((err.code = "ER_DUP_ENTRY")) {
          responseData.msg = "Duplicate Entry";
        } else {
          responseData.msg = "something went wrong";
        }
        return res.status(httpCodes.internalServerError).send(responseData);
      }

      responseData.msg = "successfully created dispatch";
      responseData.success = true;
      responseData.data = result;
      return res.status(httpCodes.success).send(responseData);
    });
  } else {
    console.log(data.deliveryNum);

    return res.status(httpCodes.internalServerError).send(responseData);
  }
};

exports.updateDispatch = (req, res) => {
  var data = req.body;

  var responseData = {
    success: false,
    msg: "invalid params",
  };
  //check if it has valid parameters
  if (
    data.deliveryNum &&
    data.updatedBy &&
    (data.destCode ||
      data.sourceCode ||
      data.vechileNumber ||
      data.transporter ||
      data.startDate ||
      data.driverNum ||
      data.shipmentNumber ||
      data.driverName ||
      data.endDate)
  ) {
    console.log(data, "in-->");
    updateDispatchModel(data, (err, result) => {
      if (err) {
        console.log(err);
        responseData.msg = "something went wrong while updating";
        return res.status(httpCodes.internalServerError).send(responseData);
      }

      responseData.msg = "successfully updated dispatch";
      responseData.success = true;
      responseData.data = result;
      return res.status(httpCodes.success).send(responseData);
    });
  } else {
    console.log(data.deliveryNum);

    return res.status(httpCodes.internalServerError).send(responseData);
  }
};

exports.deleteDispatch = (req, res) => {
  var data = req.body;

  var responseData = {
    success: false,
    msg: "invalid params",
  };
  //check if it has valid parameters
  if (data.deliveryNumber) {
    console.log(data, "in-->");
    deleteDispatchModel(data, (err, result) => {
      if (err) {
        console.log(err);
        responseData.msg = "something went wrong while deleting";
        return res.status(httpCodes.internalServerError).send(responseData);
      }

      responseData.msg = "successfully deleted dispatch";
      responseData.success = true;
      responseData.data = result;
      return res.status(httpCodes.success).send(responseData);
    });
  } else {
    console.log(data.deliveryNum);

    return res.status(httpCodes.internalServerError).send(responseData);
  }
};

exports.getDispatch = (req, res) => {
  data = {};
  data["pageNum"] = req.body.pageNum || 1;
  data["pageSize"] = 4;
  var responseData = {
    success: false,
    msg: "invalid params",
  };
  //check if it has valid parameters
  console.log(data, "in-->");
  getDispatchModel(data, (err, result) => {
    if (err) {
      console.log(err);
      responseData.msg = "something went wrong while Fetching";
      return res.status(httpCodes.internalServerError).send(responseData);
    }

    responseData.msg = "successfully fected the dispatch data";
    responseData.success = true;
    responseData.data = result;
    return res.status(httpCodes.success).send(responseData);
  });
};
