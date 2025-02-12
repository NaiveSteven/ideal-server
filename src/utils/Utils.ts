import { errorMsg } from '../const';

// 返回数据
export const resMsg = function (errorCode = 9999, data: any = [], state = -1) {
  return {
    state,
    errorCode,
    errorMsg: errorMsg[errorCode],
    data
  };
};

// 判断多个数值是否是有效值
export const hasEmpty = function (...params: any) {
  for (let i = 0, len = params.length; i < len; i++) {
    const val = params[i];
    if (val === "" || val === undefined || val === null || (typeof val === "number") && isNaN(val)) {
      return true;
    }
  }
  return false;
};

// 获取不为空的数值组成的sequelize WHERE 查询对象
export const getUncertainSqlObj = function (params: any) {
  const obj = {} as any;
  for (const key in params) {
    const val = params[key];
    if (!hasEmpty(val)) {
      obj[key] = val;
    }
  }
  return obj;
};

export const addAttr = (model: any, params: any) => {
  for (const key in params) {
    const val = params[key];
    model[key] = val;
  }
  return model;
}

export const updateAttr = (model: any, params: any) => {
  for (const key in params) {
    const val = params[key];
    model[key] = val || model[key];
  }
  return model;
}

interface TreeListItem {
  id: number;
  pid: number[];
  children: TreeListItem[];
}

// 拼接树结构
export const getTreeList = (list: any) => {
  let temp = {} as any
  let tree = [] as any
  for (let i in list) {
    if (list.hasOwnProperty(i)) {
      temp[list[i].id] = list[i]
    }
  }
  for (let i in temp) {
    if (temp.hasOwnProperty(i)) {
      if (temp[i].pid) {
        const parentId = temp[i].pid
        if (!temp[parentId].children) {
          temp[parentId].children = []
        }
        temp[parentId].children.push(temp[i])
      } else {
        tree.push(temp[i])
      }
    }
  }
  console.log(tree, 'tree')
  return tree
}



/**
 * 找到树结构当前项
 * @param {number} id	  需要找到的项的id
 * @param {number} list 树结构
*/
export const getTreeListItem = (id: number, list: TreeListItem[]) => {
  let selectedItem = {} as TreeListItem;

  const getItem = (id: number, list: TreeListItem[]) => {
    list.forEach((item) => {
      if (item.id === id) {
        selectedItem = item;
      }
      if (!selectedItem.id && item.children && item.children.length > 0) {
        getItem(id, item.children);
      }
    })
  }
  getItem(id, list)
  return selectedItem;
}

/**
 * 生成随机或者指定位数的英文数字组合
 * @param {boolean} randomFlag	是否是随机生成位数
 * @param {number} min 			生成随机位数的最小数
 * @param {number} max			生成随机位数的最大数
 * @return {string}				返回生成的英文数字组合
*/
export const randomWord = (randomFlag: boolean, min: number, max: number) => {
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