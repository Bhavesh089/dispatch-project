const jwt = require("jsonwebtoken");
const { httpCodes } = require("../config/config.json");
const { getRtokenModel } = require("../models/token-model");

exports.authcheck = (req, res, next) => {
  const token = req.headers.token;
  const responseData = {
    success: false,
    msg: "Unauthorised user",
  };
  if (!token) {
    return res.status(401).send(responseData);
  }
  try {
    const decodedData = jwt.verify(token, process.env.secretKey);
    req.userData = decodedData;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      responseData.msg = "session timeout/ token expired";
      return res.status(401).send(responseData);
    } else {
      responseData.msg = "Invalid Token";
      return res.status(401).send(responseData);
    }
  }
};

exports.generateToken = (req, res) => {
  let data = req.body;
  const responseData = {
    success: false,
    msg: "Unauthorised user",
  };
  console.log(data);
  //check if refresh token is available in the db
  if (data.refreshToken.length > 0 && data.userId > 0) {
    getRtokenModel(data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(httpCodes.badRequest).send(responseData);
      }
      console.log(result);
      //if yes then generate token
      Gdata = { userId: result[0].userId };
      if (result.length > 0) {
        const token = jwt.sign(Gdata, process.env.secretKey, {
          expiresIn: "20m",
        });
        responseData.success = true;
        responseData.token = token;
        responseData.msg = "new token";
        responseData.refreshToken = data.refreshToken;
        return res.status(httpCodes.success).send(responseData);
      }
    });
  } else {
    responseData.msg = "Invalid Token";
    return res.status(httpCodes.badRequest).send(responseData);
  }
};
