/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-07-06 19:24:13
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-05 00:26:57
 */
module.exports = {
    up(queryInterface, Sequelize) {
        const date = new Date();
        const moduleList = ['首页', '用户管理', '权限管理', '商品管理', '订单管理']
        const remarkList = ['首页模块', '用户管理模块', '权限管理模块', '商品管理模块', '订单管理模块']

        return queryInterface.bulkInsert('Module', moduleList.map((name, index) => {
            const id = index + 1;
            return {
                id,
                adminUserId: 1,
                moduleName: name,
                remark: remarkList[index],
                createdAt: date,
                updatedAt: date
            }
        }));
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Module', null, {});
    }
};