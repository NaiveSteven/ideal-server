module.exports = {
  up(queryInterface, Sequelize) {
    const date = new Date();
    const boardListIds = [1, 2, 2, 3, 4, 2, 5, 5, 7, 10, 11, 12, 13, 14];
    const typeList = [1, 2, 1, 3, 2, 2, 3, 2, 1, 3, 1, 2, 3, 3];
    const permissionList = [
      "menu.home",
      "menu.user",
      "menu.consumer",
      "menu.permission",
      "btn.user.add",
      "btn.user.edit",
      "btn.goods.del",
      "btn.goods.update",
      "view.goods.list",
      "view.user.list",
      "view.promotion.list",
      "view.admin.list",
      "btn.admin.add",
      "btn.admin.edit",
    ];

    return queryInterface.bulkInsert(
      "Permission",
      boardListIds.map((name, index) => {
        const id = index + 1;
        return {
          id,
          adminUserId: 1,
          name: "权限点-" + id,
          permission: permissionList[index],
          permission_type: typeList[index],
          module_name: "moduleNameList-" + id,
          createdAt: date,
          updatedAt: date,
        };
      })
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Permission", null, {});
  },
};
