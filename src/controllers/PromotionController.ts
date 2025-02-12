import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetPromotionListBody, AddPromotionBody, UpdatePromotionBody, DeletePromotionBody } from '../validators/Promotion';
import { Promotion as PromotionModel } from '../models/Promotion';
import { getUncertainSqlObj, resMsg, addAttr, updateAttr } from '../utils/Utils';

@Controller('/promotion')
class PromotionController {
  @Post('/getPromotionList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetPromotionListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { goodsTypeId, brandId, state, keyword } = body;
      const adminUserId = ctx.userInfo.id;
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
      const promotion = await PromotionModel.findAndCountAll(params);
      return resMsg(200, promotion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addPromotion')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddPromotionBody
  ) {
    try {
      const { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId, state, saleNum } = body;
      const adminUserId = ctx.userInfo.id;
      let promotion = new PromotionModel();
      promotion = addAttr(promotion, { adminUserId, name, goodsTypeId, price, desc, count, marketPrice, imageUrl, state, size, brandId, saleNum });
      await promotion.save();
      return resMsg(200, promotion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updatePromotion')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdatePromotionBody
  ) {
    try {
      const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state, saleNum } = body;
      let promotion = await PromotionModel.findByPk(id);
      promotion = updateAttr(promotion, { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state, saleNum });
      await promotion.save();
      return resMsg(200, promotion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deletePromotion')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeletePromotionBody
  ) {
    try {
      // const promotion = await PromotionModel.findByPk(body.id);
      // await promotion.destroy();
      await PromotionModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}