"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert(
      "sources",
      [
        {
          sourceCode: 1234,
        },
        {
          sourceCode: 1235,
        },
        {
          sourceCode: 1334,
        },
        {
          sourceCode: 1436,
        },
        {
          sourceCode: 1537,
        },
        {
          sourceCode: 1239,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("sources", null, {});
  },
};
