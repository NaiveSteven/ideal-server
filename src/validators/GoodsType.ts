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

export class GetGoodsListBody {

  page: string;

  limit: string;

  adminUserId: number;

  keyword: string;
}

export class AddGoodsTypeBody {

  name: string;

  adminUserId: number;

  pid: number | null;
}

export class UpdateGoodsTypeBody {

  id: number;

  adminUserId: number;

  name: string;

  pid: number | null;
}

export class DeleteGoodsTypeBody {

  id: number | string | number[];

  adminUserId: number;
}