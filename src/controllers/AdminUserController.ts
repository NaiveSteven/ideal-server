import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { AdminUserBody } from '../validators/AdminUser';
import { AdminUser as adminUserModel } from '../models/AdminUser';
import jwt from 'jsonwebtoken';
import configs from '../configs';

@Controller('/admin')
class AdminUserController {

  @Post('/adminUser')
  async adminUser(
    @Ctx() ctx: Context,
    @Body() body: AdminUserBody
  ) {
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

    return {
      state: 1,
      data: {
        userInfo,
        token,
      },
    }
  }
}