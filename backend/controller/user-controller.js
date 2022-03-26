const bcrypt = require("bcrypt");
const { httpCodes } = require("../config/config.json");
const jwt = require("jsonwebtoken");

const { loginModel } = require("../models/user-model");
const { createRtokenModel } = require("../models/token-model");
exports.login = (req, res) => {
  var data = req.body;
  var responseData = {
    success: false,
    msg: "Invalid params for login",
  };
  if (data.username && data.password) {
    loginModel(data, function (err, result) {
      if (err) {
        console.log(err);
        responseData.msg = "Error in login";
        return res.status(httpCodes.internalServerError).send(responseData);
      }
      if (result.length === 0) {
        responseData.msg = "Invalid Email or Password";
        return res.status(httpCodes.internalServerError).send(responseData);
      }
      bcrypt.compare(
        data.password,
        result[0].password,
        function (err1, result1) {
          if (err1) {
            console.responseData.msg = "Error in login";
            return res.status(httpCodes.internalServerError).send(responseData);
          }
          if (!result1) {
            responseData.msg = "Invalid Email or Password";
            return res.status(httpCodes.internalServerError).send(responseData);
          }
          responseData.success = true;
          responseData.msg = "Successfully Logged In";
          const userData = {
            userId: result[0].userId,
          };
          const token = jwt.sign(userData, process.env.secretKey, {
            expiresIn: "1m",
          });

          const refreshToken = jwt.sign(
            userData,
            process.env.refreshSecretKey,
            {
              expiresIn: "365d",
            }
          );
          let storeToken = {};
          storeToken.refreshToken = refreshToken;
          storeToken.userId = result[0].UserId;
          createRtokenModel(storeToken, (err3, result2) => {
            if (err3) {
              //error while storing
              console.log(err);
              responseData.msg = "Error in while storing token";
              return res
                .status(httpCodes.internalServerError)
                .send(responseData);
            }

            console.log(result);
            responseData.data = {
              username: result[0].username,
              userId: result[0].UserId,
              token,
              refreshToken,
            };
            console.log(responseData, "---->");
            return res.status(httpCodes.success).send(responseData);
          });
        }
      );
    });
  } else {
    return res.status(httpCodes.badRequest).send(responseData);
  }
};
