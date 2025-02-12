module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('User', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            adminUserId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(32),
                allowNull: false
            },
            integral: {
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
        return queryInterface.dropTable('User');
    }
};