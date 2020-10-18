import {
  Controller,
  Ctx,
  Post,
  Delete,
  Flow,
  Params,
  Get,
  Body,
  Header
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { AdminUserBody } from '../validators/AdminUser';
// import {IsNumberString, IsNotEmpty} from 'class-validator';
class PostUserBody {

  // @IsNotEmpty({
  //     message: '用户名不能为空'
  // })
  name: string;

  // @IsNotEmpty({
  //     message: '密码不能为空'
  // })
  password: string;

}
@Controller('/test')
class TestController {

  @Get('/hello')
  async hello() {
    return 'hello';
  }

  @Post('/user')
  async postUser(
    @Ctx() ctx: Context,
    @Body() body: PostUserBody,
    @Header() h: any
  ) {
    // console.log(body);
    // console.log('header', h);
    // return `当前提交的数据是：${JSON.stringify(body)}`;
    return `当前提交的数据是：${body}`;

    // ctx.status = 201;
    // return {
    //   id: 1,
    //   name: body.name,
    //   createAt: new Date()
    // }

  }
}