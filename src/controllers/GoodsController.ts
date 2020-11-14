import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetGoodsListBody, AddGoodsBody, UpdateGoodsBody, DeleteGoodsBody } from '../validators/Goods';
import { Goods as GoodsModel } from '../models/Goods';
import { getUncertainSqlObj, resMsg, addAttr, updateAttr } from '../utils/Utils';

@Controller('/goods')
class GoodsController {
  @Post('/getGoodsList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetGoodsListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { goodsTypeId, brandId, state } = body;
      const searchObj = getUncertainSqlObj({ goodsTypeId, brandId, state });
      const params = {
        where: {
          ...searchObj
        },
        limit,
        offset,
      };
      const Goods = await GoodsModel.findAndCountAll(params);
      return resMsg(200, Goods, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addGoods')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddGoodsBody
  ) {
    try {
      const { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId } = body;
      let goods = new GoodsModel();
      goods = addAttr(goods, { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId });
      goods.state = 1;
      await goods.save();
      return resMsg(200, goods, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateGoods')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateGoodsBody
  ) {
    try {
      const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state } = body;
      let goods = await GoodsModel.findByPk(id);
      goods = updateAttr(goods, { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state });
      await goods.save();
      return resMsg(200, goods, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteGoods')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteGoodsBody
  ) {
    try {
      const goods = await GoodsModel.findByPk(body.id);
      await goods.destroy();
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}