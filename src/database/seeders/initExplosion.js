module.exports = {
  up(queryInterface, Sequelize) {
    const date = new Date();
    const goodsTypeId = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 1, 2, 3, 4, 5, 6, 7];
    const brandId = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 1, 2, 3, 4, 5, 6, 7];
    const imageUrl =
      ['asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf'];
    const state = [1, 2, 2, 3, 1, 2, 3, 3, 2, 1, 2, 3, 2, 1, 1, 1, 1];
    const saleNum = [11, 22, 23, 32, 11, 52, 34, 33, 26, 17, 25, 34, 22, 11, 14, 16, 1];

    return queryInterface.bulkInsert('Explosion', goodsTypeId.map((typeId, index) => {
      const id = index + 1;
      return {
        id,
        goodsTypeId: typeId,
        brandId: brandId[index],
        name: 'Goods-' + id,
        desc: 'desc-' + id,
        price: 10 + index,
        count: 10 + index,
        size: '5' + index + 'g',
        marketPrice: 15 + index,
        imageUrl: imageUrl[index],
        state: state[index],
        saleNum: saleNum[index],
        createdAt: date,
        updatedAt: date
      }
    }));
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Explosion', null, {});
  }
};