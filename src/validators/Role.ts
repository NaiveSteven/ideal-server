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

export class GetRoleListBody {

  page: string;

  limit: string;

  adminUserId: number;

  keyword: string;
}

export class AddRoleBody {

  name: string;

  adminUserId: number;

  permissionsID: string;

  remark: string;
}

export class UpdateRoleBody {

  id: number;

  name: string;

  adminUserId: number;

  permissionsID: string;

  remark: string;
}

export class DeleteRoleBody {

  id: number | string | number[];

  adminUserId: number;
}