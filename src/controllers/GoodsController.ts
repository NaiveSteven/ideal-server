import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
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
      const { goodsTypeId, brandId, state, keyword } = body;
      const adminUserId = ctx.userInfo.id;
      console.log(adminUserId, 'adminUserIdadminUserIdadminUserIdadminUserIdadminUserId')
      const searchObj = getUncertainSqlObj({ goodsTypeId, brandId, state, adminUserId });
      const nameFilter = keyword ? {
        name: {
          [Op.like]: `%${keyword}%`,
        }
      } : {};
      const params = {
        where: {
          ...searchObj,
          ...nameFilter
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
      const { name, goodsTypeId, price, desc, count, state, marketPrice, imageUrl, size, brandId, saleNum } = body;
      const adminUserId = ctx.userInfo.id;
      let goods = new GoodsModel();
      goods = addAttr(goods, { adminUserId, name, goodsTypeId, price, desc, state, count, marketPrice, imageUrl, size, brandId, saleNum });
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
      const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state, saleNum } = body;
      let goods = await GoodsModel.findByPk(id);
      goods = updateAttr(goods, { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state, saleNum });
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
      // const goods = await GoodsModel.findByPk(body.id);
      // await goods.destroy();
      await GoodsModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}