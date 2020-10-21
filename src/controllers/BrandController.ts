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
import { GetBrandListBody, AddBrandBody, UpdateBrandBody, DeleteBrandBody } from '../validators/Brand';
import { Brand as BrandModel } from '../models/Brand';

@Controller('/brand')
class BrandController {

  @Post('/getBrandList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetBrandListBody
  ) {
    const limit = Number(body.limit);
    const offset = (Number(body.page) - 1) * limit;
    const brand = await BrandModel.findAndCountAll({
      where: {
        adminUserId: body.adminUserId,
      },
      limit,
      offset,
    });
    return {
      brand
    }
  }

  @Post('/addBrand')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddBrandBody
  ) {
    let { name, adminUserId } = body;

    let brand = new BrandModel();

    brand.name = name;
    brand.adminUserId = adminUserId;
    await brand.save();

    ctx.status = 201;
    return brand;
  }

  /**
   * 更新
   */
  @Post('/updateBrand')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateBrandBody
  ) {
    let brand = await BrandModel.findByPk(body.id);

    if (brand.adminUserId !== body.adminUserId) {
      return {
        state: -1,
        message: '禁止访问该品牌',
      };
    }

    brand.name = body.name || brand.name;
    await brand.save();

    // ctx.status = 204;
    return brand;
  }

  /**
   * 删除
   */
  @Post('/deleteBrand')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteBrandBody
  ) {
    let brand = await BrandModel.findByPk(body.id);

    if (brand.adminUserId !== body.adminUserId) {
      return {
        state: -1,
        message: '禁止访问该品牌',
      };
    }

    await brand.destroy();

    // ctx.status = 204;
    return {
      state: 1,
      data: [],
    }
  }
}