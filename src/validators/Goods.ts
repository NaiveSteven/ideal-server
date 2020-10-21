export class GetGoodsListBody {

  page: string;

  limit: string;

  goodsTypeId: number;
}

export class AddGoodsBody {
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

export class UpdateGoodsBody {
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

export class DeleteGoodsBody {

  id: number;
}