import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetOrderListBody, AddOrderBody, UpdateOrderBody, DeleteOrderBody } from '../validators/Order';
import { Order as OrderModel } from '../models/Order';

@Controller('/order')
class OrderController {

  @Post('/getOrderList')
  async getOrderList(
    @Ctx() ctx: Context,
    @Body() body: GetOrderListBody
  ) {
    const limit = Number(body.limit);
    const offset = (Number(body.page) - 1) * limit;
    let params = {};
    if (body.userId) {
      params = {
        where: {
          userId: body.userId,
        },
        limit,
        offset,
      };
    } else {
      params = {
        limit,
        offset,
      };
    }
    const order = await OrderModel.findAndCountAll(params);
    return {
      order
    }
  }

  @Post('/addOrder')
  public async addOrder(
    @Ctx() ctx: Context,
    @Body() body: AddOrderBody
  ) {
    const { userId, goodsId, phone, address, price, count, state } = body;

    const order = new OrderModel();

    order.userId = userId;
    order.goodsId = goodsId;
    order.phone = phone;
    order.address = address;
    order.price = price;
    order.count = count;
    order.state = state;

    await order.save();
    ctx.status = 201;
    return order;
  }

  /**
   * 更新
   */
  @Post('/updateOrder')
  public async updateOrder(
    @Ctx() ctx: Context,
    @Body() body: UpdateOrderBody
  ) {
    const { userId, goodsId, phone, address, price, count, state, id } = body;
    const order = await OrderModel.findByPk(id);

    order.userId = userId || order.userId;
    order.goodsId = goodsId || order.goodsId;
    order.phone = phone || order.phone;
    order.address = address || order.address;
    order.price = price || order.price;
    order.count = count || order.count;
    order.state = state || order.state;
    await order.save();

    // ctx.status = 204;
    return order;
  }

  /**
   * 删除
   */
  @Post('/deleteOrder')
  public async deleteOrder(
    @Ctx() ctx: Context,
    @Body() body: DeleteOrderBody
  ) {
    const order = await OrderModel.findByPk(body.id);

    await order.destroy();
    return {
      state: 1,
      data: [],
    }
  }
}