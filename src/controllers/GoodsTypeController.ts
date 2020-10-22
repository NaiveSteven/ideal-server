import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetGoodsListBody, AddGoodsTypeBody, UpdateGoodsTypeBody, DeleteGoodsTypeBody } from '../validators/GoodsType';
import { GoodsType as GoodsTypeModel } from '../models/GoodsType';

@Controller('/goodsType')
class GoodsTypeController {

  @Post('/getGoodsTypeList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetGoodsListBody
  ) {
    const limit = Number(body.limit);
    const offset = (Number(body.page) - 1) * limit;
    const GoodsType = await GoodsTypeModel.findAndCountAll({
      where: {
        adminUserId: body.adminUserId,
      },
      limit,
      offset,
    });
    return {
      GoodsType
    }
  }

  @Post('/addGoodsType')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddGoodsTypeBody
  ) {
    const { name, adminUserId } = body;

    const goodsType = new GoodsTypeModel();

    goodsType.name = name;
    goodsType.adminUserId = adminUserId;
    await goodsType.save();

    ctx.status = 201;
    return goodsType;
  }

  /**
   * 更新
   */
  @Post('/updateGoodsType')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateGoodsTypeBody
  ) {
    const goodsType = await GoodsTypeModel.findByPk(body.id);

    if (goodsType.adminUserId !== body.adminUserId) {
      return {
        state: -1,
        message: '禁止访问该商品类型',
      };
    }

    goodsType.name = body.name || goodsType.name;
    await goodsType.save();

    // ctx.status = 204;
    return goodsType;
  }

  /**
   * 删除
   */
  @Post('/deleteGoodsType')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteGoodsTypeBody
  ) {
    const goodsType = await GoodsTypeModel.findByPk(body.id);

    if (goodsType.adminUserId !== body.adminUserId) {
      return {
        state: -1,
        message: '禁止访问该商品类型',
      };
    }

    await goodsType.destroy();

    // ctx.status = 204;
    return {
      state: 1,
      data: [],
    }
  }
}