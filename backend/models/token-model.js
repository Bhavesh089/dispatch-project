const sqlConnection = require("../services/sqlConnection");

exports.createRtokenModel = (data, callback) => {
  var sql = "insert into tokens(userId, refreshToken) values(?,?)";
  var values = [];
  values.push(data.userId);
  values.push(data.refreshToken);
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
};

exports.getRtokenModel = (data, callback) => {
  var sql =
    "select userId, refreshToken from tokens where userId = ? and refreshToken = ?";
  var values = [];
  values.push(data.userId);
  values.push(data.refreshToken);
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
};
