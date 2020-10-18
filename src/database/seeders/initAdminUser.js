module.exports = {
    up(queryInterface, Sequelize) {
        const password = '123456';
        const date = new Date();

        return queryInterface.bulkInsert('AdminUser', ['18851382719'].map((username, index) => {
            return {
                id: index + 1,
                username,
                password,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('AdminUser', null, {});
    }
};