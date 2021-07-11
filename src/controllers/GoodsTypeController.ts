import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetGoodsListBody, AddGoodsTypeBody, UpdateGoodsTypeBody, DeleteGoodsTypeBody } from '../validators/GoodsType';
import { GoodsType as GoodsTypeModel } from '../models/GoodsType';
import { getUncertainSqlObj, resMsg, addAttr, getTreeList } from '../utils/Utils';

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
      const { keyword } = body;
      const adminUserId = ctx.userInfo.id;
      const searchObj = getUncertainSqlObj({ adminUserId });
      const nameFilter = keyword ? {
        name: {
          [Op.like]: `%${keyword}%`,
        }
      } : {};
      const GoodsType = await GoodsTypeModel.findAndCountAll({
        where: {
          ...searchObj,
          ...nameFilter,
        },
        limit: 1000,
        offset: 0,
      });
      GoodsType.rows = getTreeList(GoodsType.rows)
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
      const { name, pid } = body;
      const adminUserId = ctx.userInfo.id;
      let goodsType = new GoodsTypeModel();
      goodsType = addAttr(goodsType, { name, adminUserId, pid });
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
      goodsType.name = body.name || goodsType.name;
      goodsType.pid = body.pid || goodsType.pid;
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
      // const goodsType = await GoodsTypeModel.findByPk(body.id);
      // await goodsType.destroy();
      await GoodsTypeModel.destroy({
        where: {
          id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id },
        },
      })
      await GoodsTypeModel.destroy({
        where: {
          pid: { [Op.in]: body.id },
        },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}