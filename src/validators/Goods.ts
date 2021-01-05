export class GetGoodsListBody {

  page: string;

  limit: string;

  goodsTypeId: number;

  brandId: number;

  state: number;

  keyword: string;
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

  saleNum: number;
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

  saleNum: number;
}

export class DeleteGoodsBody {

  id: number;
}