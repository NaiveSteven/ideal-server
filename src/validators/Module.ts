// import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator";


export class AdminUserBody {

  // @IsNotEmpty({
  //   message: '用户名不能为空'
  // })
  name: string;

  // @MaxLength(20, {
  //   message: '密码长度不能大于20个字符'
  // })
}

export class GetModuleListBody {

  page: string;

  limit: string;

  adminUserId: number;

  keyword: string;
}

export class AddModuleBody {

  name: string;

  adminUserId: number;

  moduleName: string;

  remark: string;
}

export class UpdateModuleBody {

  id: number;

  adminUserId: number;

  moduleName: string;

  remark: string;
}

export class DeleteModuleBody {

  id: number | string | number[];

  adminUserId: number;
}