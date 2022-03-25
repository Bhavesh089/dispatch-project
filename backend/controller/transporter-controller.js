const { gettransporterModel } = require("../models/transporter-model");
const { httpCodes } = require("../config/config.json");

//filter the source code
exports.getTransporter = async (req, res) => {
  //get the data from the body

  var responseData = {
    success: false,
    msg: "Unable to fetch the data",
  };
  //call to the model
  gettransporterModel((err, result) => {
    console.log(result, "this is result");
    if (err) {
      return res.status(httpCodes.internalServerError).send(responseData);
    } else {
      //success response
      responseData.msg = "successfully fetched the data";
      responseData.data = result;
      return res.status(httpCodes.success).send(responseData);
    }
  });
};
