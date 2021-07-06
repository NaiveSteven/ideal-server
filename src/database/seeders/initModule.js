module.exports = {
    up(queryInterface, Sequelize) {
        const date = new Date();
        const boardListIds = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 11, 12, 13, 14];

        return queryInterface.bulkInsert('Module', boardListIds.map((name, index) => {
            const id = index + 1;
            return {
                id,
                adminUserId: 1,
                moduleName: 'moduleName-' + id,
                remark: 'remark' + id,
                createdAt: date,
                updatedAt: date
            }
        }));
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Module', null, {});
    }
};