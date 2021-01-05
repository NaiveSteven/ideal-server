export class GetOrderListBody {
  page: string;

  limit: string;

  userId: number;

  goodsId: number;

  state: number;

  deal_state: number;

  keyword: string;
}

export class AddOrderBody {
  userId: number;

  goodsId: number;

  phone: string;

  address: string;

  price: number;

  state: number;

  count: number;

  deal_state: number;
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

  deal_state: number;
}

export class DeleteOrderBody {
  id: number;
}