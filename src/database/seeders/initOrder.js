module.exports = {
  up(queryInterface, Sequelize) {
    const date = new Date();
    const goodsTypeId = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 1, 2, 3, 4, 5, 6, 7];
    const brandId = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 1, 2, 3, 4, 5, 6, 7];
    const imageUrl =
      ['asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf'];
    const state = [1, 4, 2, 3, 1, 4, 3, 3, 2, 1, 2, 3, 2, 1, 4, 1, 1];
    const deal_state = [1, 2, 2, 3, 1, 2, 3, 3, 2, 1, 2, 3, 2, 1, 1, 1, 1];

    return queryInterface.bulkInsert('Order', goodsTypeId.map((typeId, index) => {
      const id = index + 1;
      return {
        id,
        userId: typeId,
        adminUserId: index % 2 === 0 ? 1 : 2,
        goodsId: brandId[index],
        price: 10 + index,
        count: 10 + index,
        phone: imageUrl[index],
        address: imageUrl[index],
        state: state[index],
        deal_state: deal_state[index],
        createdAt: date,
        updatedAt: date
      }
    }));
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Order', null, {});
  }
};