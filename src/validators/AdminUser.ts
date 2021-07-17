// import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator";


export class AdminUserBody {

  // @IsNotEmpty({
  //   message: '用户名不能为空'
  // })
  username: string;

  // @MaxLength(20, {
  //   message: '密码长度不能大于20个字符'
  // })
  password: string;

  roles: string;

  adminUserId: string;

  phone: string;

  avatar: string;

  nickname: string;

}

export class GetAdminUserListBody {

  page: string;

  limit: string;

  keyword: string;
}
export class UpdateAdminUserBody {

  id: number;

  adminUserId: string;

  password: string;

  roles: string;

  phone: string;

  avatar: string;

  nickname: string;
}

export class DeleteAdminUserBody {

  id: number | string;

  adminUserId: string | number;
}