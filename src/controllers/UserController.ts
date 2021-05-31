import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { UserListBody } from '../validators/User';
import { User as UserModel } from '../models/User';
import { getUncertainSqlObj, resMsg } from '../utils/Utils';
import { Op } from 'sequelize';

@Controller('/user')
class UserController {
  @Post('/getUserList')
  async getUserList(
    @Ctx() ctx: Context,
    @Body() body: UserListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { keyword } = body;
      const adminUserId = ctx.userInfo.adminUserId;
      const searchObj = getUncertainSqlObj({ adminUserId });
      const nameFilter = keyword ? {
        name: {
          [Op.like]: `%${keyword}%`,
        }
      } : {};
      const userList = await UserModel.findAndCountAll({
        where: {
          ...searchObj,
          ...nameFilter,
        },
        limit,
        offset,
        attributes: ['id', 'name', 'integral', 'createdAt', 'updatedAt']
      });
      return resMsg(200, userList, 1);
    } catch (error) {
      return resMsg();
    }
  }
}