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

export class GetPermissionListBody {

  page: string;

  limit: string;

  adminUserId: number;

  keyword: string;

  permission_type: number;
}

export class AddPermissionBody {

  name: string;

  adminUserId: number;

  permission: string;

  permission_type: number;

  module_name: string;
}

export class UpdatePermissionBody {

  id: number;

  name: string;

  adminUserId: number;

  permission: string;

  permission_type: number;

  module_name: string;
}

export class DeletePermissionBody {

  id: number | string | number[];

  adminUserId: number;
}