export class GetOrderListBody {
  page: string;

  limit: string;

  userId: number;

  goodsId: number;
}

export class AddOrderBody {
  userId: number;

  goodsId: number;

  phone: string;

  address: string;

  price: number;

  state: number;

  count: number;
}

export class UpdateOrderBody {
  id: number;

  userId: number;

  goodsId: number;

  phone: string;

  address: string;

  price: number;

  state: number;

  count: number;
}

export class DeleteOrderBody {
  id: number;
}