export class GetGoodsListBody {

  page: string;

  limit: string;

  goodsTypeId: number;
}

export class AddGoodsBody {

  name: string;

  goodsTypeId: number;

  desc: string;

  count: number;

  price: number;
}

export class UpdateGoodsBody {

  id: number;

  name: string;

  goodsTypeId: number;

  desc: string;

  count: number;

  price: number;
}

export class DeleteGoodsBody {

  id: number;
}