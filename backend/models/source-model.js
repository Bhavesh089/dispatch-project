const sqlConnection = require("../services/sqlConnection");

exports.getSourcesModel = (callback) => {
  var sql = "select * from sources";
  var values = [];
  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};

exports.getSourceModel = (data, callback) => {
  var sql = "select sourceCode from sources where sourceCode like ?";
  var values = [];
  values.push("%" + data + "%");
  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};
