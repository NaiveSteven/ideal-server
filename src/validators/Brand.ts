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

export class GetBrandListBody {

  page: string;

  limit: string;

  adminUserId: number;

  keyword: string;
}

export class AddBrandBody {

  name: string;

  adminUserId: number;
}

export class UpdateBrandBody {

  id: number;

  adminUserId: number;

  name: string;
}

export class DeleteBrandBody {

  id: number | string | number[];

  adminUserId: number;
}