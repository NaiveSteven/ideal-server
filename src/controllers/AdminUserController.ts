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
import { resMsg, addAttr, updateAttr, randomWord } from '../utils/Utils';

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

  @Post('/getAdminUserList')
  async getAdminUserList(
    @Ctx() ctx: Context,
    @Body() body: GetAdminUserListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { keyword } = body;
      const params = {
        where: keyword ? {
          username: {
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
      let { username, password, roles, phone, avatar, nickname, adminUserId } = body;
      adminUserId = randomWord(false, 24, 24);
      let adminUser = new adminUserModel();
      adminUser = addAttr(adminUser, { username, password, roles, phone, avatar, nickname, adminUserId });
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
      const { password, id, roles, phone, avatar, nickname, adminUserId } = body;
      let adminUser = await adminUserModel.findByPk(id);
      if (adminUserId !== adminUser.adminUserId) {
        return resMsg(9001, [], -1);
      } 
      else {
        adminUser = updateAttr(adminUser, { password, id, roles, phone, avatar, nickname });
        await adminUser.save();
        return resMsg(200, adminUser, 1);
      }
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
      let adminUser = await adminUserModel.findByPk(body.id);
      if (body.adminUserId !== adminUser.adminUserId) {
        return resMsg(9001, [], -1);
      } else {
        await adminUser.destroy({
          where: { id: body.id },
        })
      }
      return resMsg(200, [], -1);
    } catch (error) {
      return resMsg();
    }
  }
}