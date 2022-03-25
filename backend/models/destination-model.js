const sqlConnection = require("../services/sqlConnection");

exports.getDestinationModel = (data, callback) => {
  var sql = "select destCode from destinations where destCode like ?";
  var values = [];
  values.push("%" + data + "%");
  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};
