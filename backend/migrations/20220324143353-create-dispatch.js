"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dispatches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deliveryNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      shipmentNumber: {
        type: Sequelize.INTEGER,
      },
      destCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sourceCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          customValidate(val1, val2) {
            if (val1 > val2) {
              throw new Error("End date should be greater than start date");
            }
          },
        },
      },
      driverName: {
        type: Sequelize.STRING(50),
      },
      driverNum: {
        type: Sequelize.STRING,
        validate: {
          is: "^(+91[-s]?)?[0]?(91)?[789]d{9}$",
        },
      },
      updatedBy: {
        type: Sequelize.INTEGER,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      transporter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vechileNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: [
            "^[A-HJ-NPR-Za-hj-npr-zd]{8}[dX][A-HJ-NPR-Za-hj-npr-zd]{2}d{6}$",
            "i",
          ],
          msg: "Must valid VIN",
        },
      },
      createdOn: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedOn: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dispatches");
  },
};
