import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { AdminUserBody, GetAdminUserListBody, DeleteAdminUserBody, UpdateAdminUserBody } from '../validators/AdminUser';
import { AdminUser as adminUserModel } from '../models/AdminUser';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import { resMsg, addAttr, updateAttr } from '../utils/Utils';

@Controller('/admin')
class AdminUserController {
  @Post('/adminUser')
  async adminUser(
    @Ctx() ctx: Context,
    @Body() body: AdminUserBody
  ) {
    try {
      const { username, password } = body;

      const adminUser = await adminUserModel.findOne({
        where: { username }
      });

      if (!adminUser) {
        return {
          state: -1,
          message: '用户不存在',
        };
      }

      if (password !== adminUser.password) {
        return {
          state: -1,
          message: '密码不正确',
        };
      }
      const userInfo = {
        id: adminUser.id,
        username: adminUser.username,
      };

      const token = jwt.sign(userInfo, configs.jwt.privateKey);
      return resMsg(200, { userInfo, token, }, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/getGoodsList')
  async getGoodsList(
    @Ctx() ctx: Context,
    @Body() body: GetAdminUserListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { keyword } = body;
      // const searchObj = getUncertainSqlObj({ goodsTypeId, brandId, state });
      // const nameFilter = keyword ? {
      //   name: {
      //     [Op.like]: `%${keyword}%`,
      //   }
      // } : {};
      const params = {
        where: keyword ? {
          name: {
            [Op.like]: `%${keyword}%`,
          }
        } : {},
        limit,
        offset,
      };
      const adminUser = await adminUserModel.findAndCountAll(params as any);
      return resMsg(200, adminUser, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addAdminUser')
  public async addAdminUser(
    @Ctx() ctx: Context,
    @Body() body: AdminUserBody
  ) {
    try {
      const { username, password, roles } = body;
      let adminUser = new adminUserModel();
      adminUser = addAttr(adminUser, { username, password, roles });
      await adminUser.save();
      return resMsg(200, adminUser, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateAdminUser')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Body() body: UpdateAdminUserBody
  ) {
    try {
      const { password, id, roles } = body;
      let adminUser = await adminUserModel.findByPk(id);
      adminUser = updateAttr(adminUser, { password, id, roles });
      await adminUser.save();
      return resMsg(200, adminUser, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteAdminUser')
  public async deleteBoard(
    @Ctx() ctx: Context,
    @Body() body: DeleteAdminUserBody
  ) {
    try {
      await adminUserModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}