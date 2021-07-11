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



// 找到树结构当前项
export const getTreeListItem = (id: number, list: TreeListItem[]) => {
  let selectedItem = {} as TreeListItem;
  list.forEach((item) => {
    if (item.id === id) {
      selectedItem = item;
    }
    if (item.children && item.children.length > 0) {
      getTreeListItem(id, item.children);
    }
  })
  return selectedItem;
}