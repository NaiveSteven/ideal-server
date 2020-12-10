import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetExplosionListBody, AddExplosionBody, UpdateExplosionBody, DeleteExplosionBody } from '../validators/Explosion';
import { Explosion as ExplosionModel } from '../models/Explosion';
import { getUncertainSqlObj, resMsg, addAttr, updateAttr } from '../utils/Utils';

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
      const { goodsTypeId, brandId, state } = body;
      const searchObj = getUncertainSqlObj({ goodsTypeId, brandId, state });
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
      const { name, goodsTypeId, price, desc, count, state, marketPrice, imageUrl, size, brandId, saleNum } = body;
      let explosion = new ExplosionModel();
      explosion = addAttr(explosion, { state, name, goodsTypeId, price, desc, count, marketPrice, imageUrl, size, brandId, saleNum });
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
      const { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state, saleNum } = body;
      let explosion = await ExplosionModel.findByPk(id);
      explosion = updateAttr(explosion, { name, goodsTypeId, price, desc, count, id, marketPrice, imageUrl, size, brandId, state, saleNum });
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