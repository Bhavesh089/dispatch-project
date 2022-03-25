const { httpCodes } = require("../config/config.json");

const { getDestinationModel } = require("../models/destination-model");

//filter the source code
exports.getDestination = async (req, res) => {
  //get the data from the body
  data = req.body.data;
  var responseData = {
    success: false,
    msg: "Please enter valid destination code",
  };
  //if data present in the body
  if (data && data.length > 0) {
    //call to the model
    getDestinationModel(data, (err, result) => {
      console.log(result, "this is result");
      if (err || result.length === 0) {
        return res.status(httpCodes.internalServerError).send(responseData);
      } else {
        //success response
        responseData.msg = "successfully fetched the data";
        responseData.data = result;
        return res.status(httpCodes.success).send(responseData);
      }
    });
  } else {
    //if data not present in the body
    return res.status(httpCodes.badRequest).send(responseData);
  }
};
