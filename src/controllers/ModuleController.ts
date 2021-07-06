import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetModuleListBody, AddModuleBody, UpdateModuleBody, DeleteModuleBody } from '../validators/Module';
import { Module as ModuleModel } from '../models/Module';
import { getUncertainSqlObj, resMsg, addAttr } from '../utils/Utils';

@Controller('/module')
class ModuleController {
  @Post('/getModuleList')
  async getModuleList(
    @Ctx() ctx: Context,
    @Body() body: GetModuleListBody
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
      const module = await ModuleModel.findAndCountAll({
        where: {
          ...searchObj,
          ...nameFilter,
        },
        limit,
        offset,
      });
      return resMsg(200, module, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addModule')
  public async addModule(
    @Ctx() ctx: Context,
    @Body() body: AddModuleBody
  ) {
    try {
      const { moduleName, remark } = body;
      let module = new ModuleModel();
      const adminUserId = ctx.userInfo.id
      module = addAttr(module, { moduleName, adminUserId, remark  });
      await module.save();
      return resMsg(200, module, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateModule')
  public async updateModule(
    @Ctx() ctx: Context,
    @Body() body: UpdateModuleBody
  ) {
    try {
      const module = await ModuleModel.findByPk(body.id);
      module.moduleName = body.moduleName || module.moduleName;
      module.remark = body.remark || module.remark;
      await module.save();
      return resMsg(200, module, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteModule')
  public async deleteModule(
    @Ctx() ctx: Context,
    @Body() body: DeleteModuleBody
  ) {
    try {
      await ModuleModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}