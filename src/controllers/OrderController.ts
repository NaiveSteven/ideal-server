import {
  Controller,
  Ctx,
  Post,
  Body,
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetOrderListBody, AddOrderBody, UpdateOrderBody, DeleteOrderBody } from '../validators/Order';
import { Order as OrderModel } from '../models/Order';
import { getUncertainSqlObj, resMsg } from '../utils/Utils';

@Controller('/order')
class OrderController {
  @Post('/getOrderList')
  async getOrderList(
    @Ctx() ctx: Context,
    @Body() body: GetOrderListBody,
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { userId } = body;
      const searchObj = getUncertainSqlObj({ userId });
      const params = {
        where: {
          ...searchObj
        },
        limit,
        offset,
      };
      const order = await OrderModel.findAndCountAll(params);
      return resMsg(200, order, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addOrder')
  public async addOrder(
    @Ctx() ctx: Context,
    @Body() body: AddOrderBody
  ) {
    try {
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
      return resMsg(200, order, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateOrder')
  public async updateOrder(
    @Ctx() ctx: Context,
    @Body() body: UpdateOrderBody
  ) {
    try {
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
      return resMsg(200, order, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteOrder')
  public async deleteOrder(
    @Ctx() ctx: Context,
    @Body() body: DeleteOrderBody
  ) {
    try {
      const order = await OrderModel.findByPk(body.id);
      await order.destroy();
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}