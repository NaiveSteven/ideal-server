import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetExplosionListBody, AddExplosionBody, UpdateExplosionBody, DeleteExplosionBody } from '../validators/Explosion';
import { Explosion as ExplosionModel } from '../models/Explosion';
import { getUncertainSqlObj, resMsg } from '../utils/Utils';

@Controller('/explosion')
class ExplosionController {
  @Post('/getExplosionList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetExplosionListBody
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
      const explosion = await ExplosionModel.findAndCountAll(params);
      return resMsg(200, explosion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addExplosion')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddExplosionBody
  ) {
    try {
      const { name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId } = body;
      const explosion = new ExplosionModel();
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
      return resMsg(200, explosion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateExplosion')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateExplosionBody
  ) {
    try {
      const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId } = body;
      const explosion = await ExplosionModel.findByPk(id);

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
      return resMsg(200, explosion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteExplosion')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteExplosionBody
  ) {
    try {
      const explosion = await ExplosionModel.findByPk(body.id);

      await explosion.destroy();
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}