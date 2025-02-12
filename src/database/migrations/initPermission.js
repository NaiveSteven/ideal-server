module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Permission",
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
        moduleId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        permission: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        permission_type: {
          type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("Permission");
  },
};
