import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetGoodsListBody, AddGoodsBody, UpdateGoodsBody, DeleteGoodsBody } from '../validators/Goods';
import { Goods as GoodsModel } from '../models/Goods';

@Controller('/goods')
class GoodsController {

  @Post('/getGoodsList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetGoodsListBody
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
    const Goods = await GoodsModel.findAndCountAll(params);
    return {
      Goods
    }
  }

  @Post('/addGoods')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddGoodsBody
  ) {
    const { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId } = body;

    const goods = new GoodsModel();

    goods.name = name;
    goods.goodsTypeId = goodsTypeId;
    goods.desc = desc;
    goods.count = count;
    goods.price = price;
    goods.marketPrice = marketPrice;
    goods.imageUrl = imageUrl;
    goods.size = size;
    goods.brandId = brandId;
    goods.state = 1;
    await goods.save();

    ctx.status = 201;
    return goods;
  }

  /**
   * 更新
   */
  @Post('/updateGoods')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateGoodsBody
  ) {
    const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state } = body;
    const goods = await GoodsModel.findByPk(id);

    goods.name = name || goods.name;
    goods.goodsTypeId = goodsTypeId || goods.goodsTypeId;
    goods.desc = desc || goods.desc;
    goods.count = count || goods.count;
    goods.price = price || goods.price;
    goods.marketPrice = marketPrice || goods.marketPrice;
    goods.imageUrl = imageUrl || goods.imageUrl;
    goods.size = size || goods.size;
    goods.brandId = brandId || goods.brandId;
    goods.state = state || goods.state;
    await goods.save();

    // ctx.status = 204;
    return goods;
  }

  /**
   * 删除
   */
  @Post('/deleteGoods')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteGoodsBody
  ) {
    const goods = await GoodsModel.findByPk(body.id);

    await goods.destroy();

    // ctx.status = 204;
    return {
      state: 1,
      data: [],
    }
  }
}