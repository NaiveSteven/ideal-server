import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { GetBrandListBody, AddBrandBody, UpdateBrandBody, DeleteBrandBody } from '../validators/Brand';
import { Brand as BrandModel } from '../models/Brand';
import { getUncertainSqlObj, resMsg } from '../utils/Utils';

@Controller('/brand')
class BrandController {
  @Post('/getBrandList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetBrandListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { adminUserId } = body;
      const searchObj = getUncertainSqlObj({ adminUserId });
      const brand = await BrandModel.findAndCountAll({
        where: {
          ...searchObj
        },
        limit,
        offset,
      });
      return resMsg(200, brand, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addBrand')
  public async addGoodsType(
    @Ctx() ctx: Context,
    @Body() body: AddBrandBody
  ) {
    try {
      const { name, adminUserId } = body;
      const brand = new BrandModel();
      brand.name = name;
      brand.adminUserId = adminUserId;

      await brand.save();
      return resMsg(200, brand, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateBrand')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateBrandBody
  ) {
    try {
      const brand = await BrandModel.findByPk(body.id);
      if (brand.adminUserId !== body.adminUserId) {
        return {
          state: -1,
          message: '禁止访问该品牌',
        };
      }
      brand.name = body.name || brand.name;

      await brand.save();
      return resMsg(200, brand, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteBrand')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteBrandBody
  ) {
    try {
      const brand = await BrandModel.findByPk(body.id);
      if (brand.adminUserId !== body.adminUserId) {
        return {
          state: -1,
          message: '禁止访问该品牌',
        };
      }

      await brand.destroy();
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}