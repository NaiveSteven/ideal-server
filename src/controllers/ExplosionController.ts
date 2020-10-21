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
import { GetExplosionListBody, AddExplosionBody, UpdateExplosionBody, DeleteExplosionBody } from '../validators/Explosion';
import { Explosion as ExplosionModel } from '../models/Explosion';

@Controller('/explosion')
class ExplosionController {

  @Post('/getExplosionList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetExplosionListBody
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
    const explosion = await ExplosionModel.findAndCountAll(params);
    return {
      explosion
    }
  }

  @Post('/addExplosion')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddExplosionBody
  ) {
    let { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId } = body;

    let explosion = new ExplosionModel();

    explosion.name = name;
    explosion.goodsTypeId = goodsTypeId;
    explosion.desc = desc;
    explosion.count = count;
    explosion.price = price;
    explosion.marketPrice = marketPrice;
    explosion.imageUrl = imageUrl;
    explosion.size = size;
    explosion.brandId = brandId;
    explosion.state = 1;
    await explosion.save();

    ctx.status = 201;
    return explosion;
  }

  /**
   * 更新
   */
  @Post('/updateExplosion')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateExplosionBody
  ) {
    let { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId } = body;
    let explosion = await ExplosionModel.findByPk(id);

    explosion.name = name || explosion.name;
    explosion.goodsTypeId = goodsTypeId || explosion.goodsTypeId;
    explosion.desc = desc || explosion.desc;
    explosion.count = count || explosion.count;
    explosion.price = price || explosion.price;
    explosion.marketPrice = marketPrice || explosion.marketPrice;
    explosion.imageUrl = imageUrl || explosion.imageUrl;
    explosion.size = size || explosion.size;
    explosion.brandId = brandId || explosion.brandId;
    explosion.state = explosion.state;
    await explosion.save();

    // ctx.status = 204;
    return explosion;
  }

  /**
   * 删除
   */
  @Post('/deleteExplosion')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteExplosionBody
  ) {
    let explosion = await ExplosionModel.findByPk(body.id);

    await explosion.destroy();

    // ctx.status = 204;
    return {
      state: 1,
      data: [],
    }
  }
}