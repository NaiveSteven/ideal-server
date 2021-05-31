import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetPermissionListBody, AddPermissionBody, UpdatePermissionBody, DeletePermissionBody } from '../validators/Permission';
import { Permission as PermissionModel } from '../models/Permission';
import { getUncertainSqlObj, resMsg, addAttr, updateAttr } from '../utils/Utils';

@Controller('/permission')
class PermissionController {
  @Post('/getPermissionList')
  async getPermissionList(
    @Ctx() ctx: Context,
    @Body() body: GetPermissionListBody
  ) {
    try {
      const limit = Number(body.limit);
      const offset = (Number(body.page) - 1) * limit;
      const { keyword, permission_type } = body;
      const adminUserId = ctx.userInfo.id;
      const searchObj = getUncertainSqlObj({ adminUserId, permission_type });
      const nameFilter = keyword ? {
        name: {
          [Op.like]: `%${keyword}%`,
        }
      } : {};
      const permission = await PermissionModel.findAndCountAll({
        where: {
          ...searchObj,
          ...nameFilter,
        },
        limit,
        offset,
      });
      return resMsg(200, permission, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addPermission')
  public async addPermission(
    @Ctx() ctx: Context,
    @Body() body: AddPermissionBody
  ) {
    try {
      const { name, module_name, permission, permission_type } = body;
      const adminUserId = ctx.userInfo.id;
      let pion = new PermissionModel();
      pion = addAttr(pion, { name, adminUserId, module_name, permission, permission_type });
      await pion.save();
      return resMsg(200, pion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updatePermission')
  public async updatePermission(
    @Ctx() ctx: Context,
    @Body() body: UpdatePermissionBody
  ) {
    try {
      const { id, name, module_name, permission, permission_type } = body;
      let pion = await PermissionModel.findByPk(id);
      pion = updateAttr(pion, { id, name, module_name, permission, permission_type });
      await pion.save();
      return resMsg(200, pion, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deletePermission')
  public async deletePermission(
    @Ctx() ctx: Context,
    @Body() body: DeletePermissionBody
  ) {
    try {
      await PermissionModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}