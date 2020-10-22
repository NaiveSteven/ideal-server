import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetPromotionListBody, AddPromotionBody, UpdatePromotionBody, DeletePromotionBody } from '../validators/Promotion';
import { Promotion as PromotionModel } from '../models/Promotion';
import { getUncertainSqlObj, resMsg } from '../utils/Utils';

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
      const { goodsTypeId } = body;
      const searchObj = getUncertainSqlObj({ goodsTypeId });
      const params = {
        where: {
          ...searchObj
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
      const { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId } = body;
      const promotion = new PromotionModel();

      promotion.name = name;
      promotion.goodsTypeId = goodsTypeId;
      promotion.desc = desc;
      promotion.count = count;
      promotion.price = price;
      promotion.marketPrice = marketPrice;
      promotion.imageUrl = imageUrl;
      promotion.size = size;
      promotion.brandId = brandId;
      promotion.state = 1;
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
      const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId } = body;
      const promotion = await PromotionModel.findByPk(id);

      promotion.name = name || promotion.name;
      promotion.goodsTypeId = goodsTypeId || promotion.goodsTypeId;
      promotion.desc = desc || promotion.desc;
      promotion.count = count || promotion.count;
      promotion.price = price || promotion.price;
      promotion.marketPrice = marketPrice || promotion.marketPrice;
      promotion.imageUrl = imageUrl || promotion.imageUrl;
      promotion.size = size || promotion.size;
      promotion.brandId = brandId || promotion.brandId;
      promotion.state = promotion.state;
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
      const promotion = await PromotionModel.findByPk(body.id);
      await promotion.destroy();
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}