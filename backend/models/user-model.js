const sqlConnection = require("../services/sqlConnection");

exports.loginModel = (data, callback) => {
  var sql =
    "SELECT ID as UserId, username, password  FROM Users WHERE username = ?";
  var values = [];
  values.push(data.username);
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
};
