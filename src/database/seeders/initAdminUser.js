/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2020-11-18 19:12:14
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-05 00:28:43
 */
const randomWord = (randomFlag, min, max) => {
	let str = '',
		range = min,	// 默认赋值为第二个参数，如果是随机产生位数会通过下面的if改变。
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	// 随机产生
	if (randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for (let i = 0; i < range; i++) {
		let index = Math.round(Math.random() * (arr.length - 1));
		str += arr[index];
	}
	return str;
}
module.exports = {
  up(queryInterface, Sequelize) {
    const password = "123456"
    const date = new Date()
    const roles = "1,2,3,4"
    return queryInterface.bulkInsert(
      "AdminUser",
      ["18851382719"].map((username, index) => {
        return {
          id: index + 1,
          adminUserId: randomWord(false, 24),
          nickname: "nickname" + index,
          phone: "1535802122" + index,
          avatar: "https://vue3js.cn/docs/logo.png",
          username,
          password,
          roles: roles,
          createdAt: date,
          updatedAt: date,
        }
      })
    )
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("AdminUser", null, {})
  },
}
