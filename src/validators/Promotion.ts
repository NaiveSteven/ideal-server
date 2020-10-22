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

export class GetPromotionListBody {
  page: string;

  limit: string;

  goodsTypeId: number;
}

export class AddPromotionBody {
  name: string;

  brandId: number;

  goodsTypeId: number;

  desc: string;

  count: number;

  price: number;

  marketPrice: number;

  state: number;

  size: string;

  imageUrl: string;
}

export class UpdatePromotionBody {
  id: number;

  brandId: number;

  name: string;

  goodsTypeId: number;

  desc: string;

  count: number;

  price: number;

  marketPrice: number;

  state: number;

  size: number;

  imageUrl: string;
}

export class DeletePromotionBody {

  id: number;
}