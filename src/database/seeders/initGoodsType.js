
module.exports = {
    up(queryInterface, Sequelize) {
        let date = new Date();
        let boardListIds = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 11, 12, 13, 14];

        return queryInterface.bulkInsert('GoodsType', boardListIds.map((name, index) => {
            let id = index + 1;
            return {
                id,
                adminUserId: 1,
                name: 'GoodsType-' + id,
                createdAt: date,
                updatedAt: date
            }
        }));
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('GoodsType', null, {});
    }
};