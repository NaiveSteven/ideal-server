/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-24 23:56:53
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-05 00:36:32
 */
const date = new Date();
const boardListIds = ['超级管理员', '订单操作员', '商品管理员', '游客'];
const descList = ['拥有所有权限', '只拥有订单模块权限', '只拥有商品模块权限', '只拥有首页权限']
const permissionsID = ['1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16', '13,14', '9,10,11,12', '1']
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Role",
      boardListIds.map((name, index) => {
        const id = index + 1;
        return {
          id,
          adminUserId: 1,
          name: name,
          permissionsID: permissionsID[index],
          remark: descList[index],
          createdAt: date,
          updatedAt: date,
        };
      })
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Role", null, {});
  },
};
