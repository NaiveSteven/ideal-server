/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-24 23:56:52
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-05 00:28:16
 */
module.exports = {
  up(queryInterface, Sequelize) {
    const date = new Date();
    const typeList = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3
    ];
    const moduleIdList = [1,2,2,2,3,3,3,3,4,4,4,4,5,5,3,3]
    const permissionList = [
      "menu.home",

      "menu.userManage",
      "menu.adminUser",
      "menu.consumer",

      "menu.permissionManage",
      "menu.module",
      "menu.point",
      "menu.role",

      "menu.goodsManage",
      "menu.brand",
      "menu.goodsType",
      "menu.goods",

      "menu.orderManage",
      "menu.placeOrder",

      "btn.module.delete",

      "view.module.list",
    ];

    return queryInterface.bulkInsert(
      "Permission",
      permissionList.map((name, index) => {
        const id = index + 1;
        return {
          id,
          adminUserId: 1,
          moduleId: moduleIdList[index],
          name: name,
          permission: permissionList[index],
          permission_type: typeList[index],
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
