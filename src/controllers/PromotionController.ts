import {
  Controller,
  Ctx,
  Post,
  Delete,
  Flow,
  Params,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetPromotionListBody, AddPromotionBody, UpdatePromotionBody, DeletePromotionBody } from '../validators/Promotion';
import { Promotion as PromotionModel } from '../models/Promotion';

@Controller('/promotion')
class PromotionController {

  @Post('/getPromotionList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetPromotionListBody
  ) {
    const limit = Number(body.limit);
    const offset = (Number(body.page) - 1) * limit;
    let params = {};
    if (body.goodsTypeId) {
      
      params = {
        where: {
          goodsTypeId: body.goodsTypeId,
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
    const promotion = await PromotionModel.findAndCountAll(params);
    return {
      promotion
    }
  }

  @Post('/addPromotion')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddPromotionBody
  ) {
    let { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId } = body;

    let promotion = new PromotionModel();

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

    ctx.status = 201;
    return promotion;
  }

  /**
   * 更新
   */
  @Post('/updatePromotion')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdatePromotionBody
  ) {
    let { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId } = body;
    let promotion = await PromotionModel.findByPk(id);

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

    // ctx.status = 204;
    return promotion;
  }

  /**
   * 删除
   */
  @Post('/deletePromotion')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeletePromotionBody
  ) {
    let promotion = await PromotionModel.findByPk(body.id);

    await promotion.destroy();

    // ctx.status = 204;
    return {
      state: 1,
      data: [],
    }
  }
}