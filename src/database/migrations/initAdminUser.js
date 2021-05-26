module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AdminUser', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING(50),
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(32),
                allowNull: false
            },
            roles: {
                type: Sequelize.STRING(10000),
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
        return queryInterface.dropTable('AdminUser');
    }
};