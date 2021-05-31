import configs from './configs';
import Koa, { Context, Next } from 'Koa';
import { bootstrapControllers } from 'koa-ts-controllers';
import KoaRouter from 'koa-router';
import path from 'path';
import KoaBody from 'koa-body';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';
const koajwt = require('koa-jwt');
import { resMsg } from './utils/Utils';
import Boom from '@hapi/Boom';

(async () => {
  const app = new Koa();

  const router = new KoaRouter();

  const cors = require('koa2-cors');

  const json = require('koa-json');

  // 链接数据库
  const db = new Sequelize({
    ...configs.database,
    models: [__dirname + '/models/**/*']
  });

  app.use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

  app.use(async (ctx: Context, next: Next) => {
    const token = ctx.request.headers['authorization'];
    if (token) {
      ctx.userInfo = jwt.verify(token.slice(7, token.length), configs.jwt.privateKey) as any;
    }
    await next().catch((err) => {
      if (err.status == '401') {
        ctx.status = 200;
        ctx.body = resMsg(401, [], -1)
      } else {
        throw err;
      }
    })
  });

  app.use(koajwt({ secret: configs.jwt.privateKey }).unless({
    path: [/^\/api\/v1\/admin\/adminUser/]
  }))

  // 注册路由
  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    versions: [1],
    controllers: [
      path.resolve(__dirname, 'controllers/**/*')
    ],
    // errorHandler: async (err: any, ctx: Context) => {
    //   let status = 500;
    //   let body: any = {
    //     status: status,
    //     error: 'error',
    //     message: 'error message'
    //   };

    //   if (err.output) {
    //     status = err.output.statusCode;
    //     body = {
    //       ...err.output.payload
    //     };
    //     if (err.data) {
    //       body.errorDetails = err.data;
    //     }
    //   }
    //   ctx.status = status;
    //   ctx.body = body;
    // }
  });

  app.use(json());
  app.use(KoaBody());
  app.use(router.routes());

  app.listen(configs.server.port, configs.server.host, () => {
    console.log(`服务启动成功: http: //${configs.server.host}:${configs.server.port}`);
  })
})();

