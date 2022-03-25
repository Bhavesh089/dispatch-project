const { httpCodes } = require("../config/config.json");

const { getSourceModel, getSourcesModel } = require("../models/source-model");

//get all source code
exports.getSources = async (req, res) => {
  var responseData = {
    success: false,
    msg: "Something went wrong while fetching the data",
  };

  //call to the model
  getSourcesModel((err, result) => {
    if (err) {
      // if error
      return res.status(httpCodes.internalServerError).send(responseData);
    } // success
    responseData.msg = "successfully fetched the data";
    responseData.data = result;
    return res.status(httpCodes.success).send(responseData);
  });
};
//filter the source code
exports.getSource = async (req, res) => {
  //get the data from the body
  data = req.body.data;
  var responseData = {
    success: false,
    msg: "Please enter valid source code",
  };
  //if data present in the body
  if (data && data.length > 0) {
    //call to the model
    getSourceModel(data, (err, result) => {
      console.log(result, "this is result");
      if (err || result.length === 0) {
        return res.status(httpCodes.internalServerError).send(responseData);
      } else {
        //success response
        responseData.msg = "successfully fetched the data";
        responseData.success = true;
        responseData.data = result;
        return res.status(httpCodes.success).send(responseData);
      }
    });
  } else {
    //if data not present in the body
    return res.status(httpCodes.badRequest).send(responseData);
  }
};
