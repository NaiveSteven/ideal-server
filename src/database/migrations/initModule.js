module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Module",
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        adminUserId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        moduleName: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        remark: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        charset: "utf8mb4",
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Module");
  },
};
