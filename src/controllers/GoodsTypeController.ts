import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetGoodsListBody, AddGoodsTypeBody, UpdateGoodsTypeBody, DeleteGoodsTypeBody } from '../validators/GoodsType';
import { GoodsType as GoodsTypeModel } from '../models/GoodsType';
import { getUncertainSqlObj, resMsg, addAttr, } from '../utils/Utils';

@Controller('/goodsType')
class GoodsTypeController {
  @Post('/getGoodsTypeList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetGoodsListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { adminUserId } = body;
      const searchObj = getUncertainSqlObj({ adminUserId });
      const GoodsType = await GoodsTypeModel.findAndCountAll({
        where: {
          ...searchObj
        },
        limit,
        offset,
      });
      return resMsg(200, GoodsType, 1);
    } catch (e) {
      return resMsg();
    }

  }

  @Post('/addGoodsType')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddGoodsTypeBody
  ) {
    try {
      const { name, adminUserId } = body;
      let goodsType = new GoodsTypeModel();
      goodsType = addAttr(goodsType, { name, adminUserId });
      await goodsType.save();
      return resMsg(200, goodsType, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateGoodsType')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateGoodsTypeBody
  ) {
    try {
      const goodsType = await GoodsTypeModel.findByPk(body.id);
      if (goodsType.adminUserId !== body.adminUserId) {
        return {
          state: -1,
          message: '禁止访问该商品类型',
        };
      }
      goodsType.name = body.name || goodsType.name;
      await goodsType.save();
      return resMsg(200, goodsType, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteGoodsType')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteGoodsTypeBody
  ) {
    try {
      const goodsType = await GoodsTypeModel.findByPk(body.id);
      if (goodsType.adminUserId !== body.adminUserId) {
        return {
          state: -1,
          message: '禁止访问该商品类型',
        };
      }
      await goodsType.destroy();
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}