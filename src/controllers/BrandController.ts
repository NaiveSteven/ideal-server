import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetBrandListBody, AddBrandBody, UpdateBrandBody, DeleteBrandBody } from '../validators/Brand';
import { Brand as BrandModel } from '../models/Brand';
import { getUncertainSqlObj, resMsg, addAttr } from '../utils/Utils';

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
      const { keyword } = body;
      const adminUserId = ctx.userInfo.id;
      const searchObj = getUncertainSqlObj({ adminUserId });
      const nameFilter = keyword ? {
        name: {
          [Op.like]: `%${keyword}%`,
        }
      } : {};
      const brand = await BrandModel.findAndCountAll({
        where: {
          ...searchObj,
          ...nameFilter,
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
      const { name } = body;
      let brand = new BrandModel();
      const adminUserId = ctx.userInfo.id
      brand = addAttr(brand, { name, adminUserId });
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
      // const brand = await BrandModel.findByPk(body.id);
      // await brand.destroy();
      await BrandModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}