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
import { UserListBody } from '../validators/User';
import { User as UserModel } from '../models/User';

@Controller('/user')
class UserController {

  @Post('/getUserList')
  async getUserList(
    @Ctx() ctx: Context,
    @Body() body: UserListBody
  ) {
    const limit = Number(body.limit);
    const offset = (Number(body.page) - 1) * limit;
    const userList = await UserModel.findAndCountAll({
      where: {
        adminUserId: body.adminUserId,
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