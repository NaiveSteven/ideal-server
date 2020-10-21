module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Goods', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      goodsTypeId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      brandId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      desc: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      size: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      marketPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      charset: 'utf8mb4'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Goods');
  }
};