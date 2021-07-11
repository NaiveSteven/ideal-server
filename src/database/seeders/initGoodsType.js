module.exports = {
    up(queryInterface, Sequelize) {
        const date = new Date();
        const boardListIds = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 11, 12, 13, 14];
        const pids = [null, 1, 1, null, 3, 3, 5, 2, null, null, null, 2, null, null];

        return queryInterface.bulkInsert('GoodsType', boardListIds.map((name, index) => {
            const id = index + 1;
            return {
                id,
                pid: pids[index],
                adminUserId: 1,
                name: 'GoodsType-' + id,
                children: null,
                createdAt: date,
                updatedAt: date
            }
        }));
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('GoodsType', null, {});
    }
};