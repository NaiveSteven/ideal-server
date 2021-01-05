import {
  Controller,
  Ctx,
  Post,
  Body,
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetOrderListBody, AddOrderBody, UpdateOrderBody, DeleteOrderBody } from '../validators/Order';
import { Order as OrderModel } from '../models/Order';
import { getUncertainSqlObj, resMsg, addAttr, updateAttr } from '../utils/Utils';

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
      const { userId, state, deal_state, keyword } = body;
      const searchObj = getUncertainSqlObj({ userId, state, deal_state });
      const phoneFilter = keyword ? {phone: {
        [Op.like]: `%${keyword}%`,
      }} : {};
      const params = {
        where: {
          ...searchObj,
          ...phoneFilter,
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
      const { userId, goodsId, phone, address, price, count, state, deal_state } = body;
      let order = new OrderModel();
      order = addAttr(order, { userId, goodsId, phone, address, price, count, state, deal_state });
      await order.save();
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
      const { userId, goodsId, phone, address, price, count, state, id, deal_state } = body;
      let order = await OrderModel.findByPk(id);
      order = updateAttr(order, { userId, goodsId, phone, address, price, count, state, id, deal_state });
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