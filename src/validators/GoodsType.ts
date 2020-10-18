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
}

export class AddGoodsTypeBody {

  name: string;

  adminUserId: number;
}

export class UpdateGoodsTypeBody {

  id: number;

  adminUserId: number;

  name: string;
}

export class DeleteGoodsTypeBody {

  id: number;

  adminUserId: number;
}