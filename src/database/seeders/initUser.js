const crypto = require('crypto');

module.exports = {
    up(queryInterface, Sequelize) {
        let md5 = crypto.createHash('md5');
        let password = md5.update('123456').digest('hex');
        let date = new Date();
        const integral = [0, 0, 0, 2, 5, 8, 17, 23, 54, 234, 23412]

        return queryInterface.bulkInsert('User', ['zMouse', 'mt', 'leo', 'reci', 'alex', 'steven', 'aaa', 'ideal', 'sixty', 'root', 'hello'].map((name, index) => {
            return {
                id: index + 1,
                adminUserId: 1,
                name,
                password,
                integral: integral[index],
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('User', null, {});
    }
};