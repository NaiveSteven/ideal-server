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
import { AdminUserBody } from '../validators/AdminUser';

@Controller('/admin')
class AdminUserController {

  @Post('/adminUser')
  async adminUser(
    @Ctx() ctx: Context,
    @Body() body: AdminUserBody
  ) {
    let { username, password } = body;
    if (username !== '18851382719') {
      return {
        state: -1,
        message: '用户名不正确',
      };
    }
    if (password !== '123456') {
      return {
        state: -1,
        message: '密码不正确',
      };
    }
    return {
      state: 1,
      data: true,
    }
  }
}