const sqlConnection = require("../services/sqlConnection");

// insert into dispatches(id, deliveryNumber, shipmentNumber, destCode, sourceCode, startDate, EndDate, driverName, driverNum, updatedBy, createdBY, isDeleted, transporter, vechileNumber) values(12312231, 123123,  12321, 12321, 32223, 20220325, 20220317, "bhavesh", "13298832", 1, 1, false, "xyz", 123123123);
exports.createDispatchModel = (data, callback) => {
  var values = [];
  var sql =
    "insert into dispatches(deliveryNumber, shipmentNumber, destCode, sourceCode, startDate, EndDate, driverName, driverNum, updatedBy, createdBy, transporter, vechileNumber) values(?,?,?,?,?,?,?,?,?,?,?,?)";
  values.push(data.deliveryNum);

  if (!data.shipmentNumber) {
    values.push(null);
  } else {
    values.push(data.shipmentNumber);
  }
  values.push(data.destCode);
  values.push(data.sourceCode);
  values.push(data.startDate);
  values.push(data.endDate);

  if (!data.driverName) {
    values.push(null);
  } else {
    values.push(data.driverName);
  }
  if (!data.driverNum) {
    values.push(null);
  } else {
    values.push(data.driverNum);
  }
  values.push(data.updatedBy);
  values.push(data.createdBy);
  values.push(data.transporter);
  values.push(data.vechileNumber);

  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};

exports.updateDispatchModel = (data, callback) => {
  var values = [];
  var sql = "update dispatches set ";
  isMul = false;
  if (data.destCode) {
    sql += "destCode = ?,";
    values.push(data.destCode);
  }

  if (data.sourceCode) {
    sql += "sourceCode = ?,";
    values.push(data.sourceCode);
  }

  if (data.vechileNumber) {
    sql += "vechileNumber = ?,";
    values.push(data.vechileNumber);
  }

  if (data.transporter) {
    sql += "transporter = ?,";
    values.push(data.transporter);
  }

  if (data.shipmentNumber) {
    sql += "shipmentNumber = ?,";
    values.push(data.shipmentNumber);
  }

  if (data.startDate) {
    sql += "startDate = ?,";
    values.push(data.startDate);
  }
  if (data.endDate) {
    sql += "endDate = ?,";
    values.push(data.endDate);
  }
  if (data.driverName) {
    sql += "driverName = ?,";
    values.push(data.driverName);
  }
  if (data.driverNum) {
    sql += "driverNum = ?,";
    values.push(data.driverNum);
  }

  sql += "updatedBy = ?";
  values.push(data.updatedBy);
  sql += " where deliveryNumber = ?";

  values.push(data.deliveryNum);
  console.log(sql);

  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};

exports.deleteDispatchModel = (data, callback) => {
  var values = [];
  var sql = "update dispatches set isDeleted = true where deliveryNumber = ?";

  values.push(data.deliveryNumber);
  console.log(sql);

  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};

exports.getDispatchModel = (data, callback) => {
  var values = [];
  var sql = `select * from dispatches where isDeleted = false limit ${
    data.pageSize
  } offset ${(data.pageNum - 1) * data.pageSize}`;

  console.log(sql);

  sqlConnection.executeQuery(sql, values, function (err, result) {
    console.log(result, err);
    callback(err, result);
  });
};
