const sqlConnection = require("../services/sqlConnection");

exports.gettransporterModel = (callback) => {
  var sql = "select * from transpoters";
  var values = [];
  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};
