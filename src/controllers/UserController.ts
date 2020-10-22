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

@Controller('/user')
class UserController {
  @Post('/getUserList')
  async getUserList(
    @Ctx() ctx: Context,
    @Body() body: UserListBody
  ) {
    const limit = Number(body.limit);
    const offset = (Number(body.page) - 1) * limit;
    const { adminUserId } = body;
    const searchObj = getUncertainSqlObj({ adminUserId });
    const userList = await UserModel.findAndCountAll({
      where: {
        ...searchObj
      },
      limit,
      offset,
      attributes: ['id', 'name', 'createdAt', 'updatedAt']
    });
    return {
      userList
    }
  }
}