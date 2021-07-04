import {
  Controller,
  Ctx,
  Post,
  Body
} from 'koa-ts-controllers';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { GetRoleListBody, AddRoleBody, UpdateRoleBody, DeleteRoleBody } from '../validators/Role';
import { Role as RoleModel } from '../models/Role';
import { getUncertainSqlObj, resMsg, addAttr, updateAttr } from '../utils/Utils';

@Controller('/role')
class RoleController {
  @Post('/getRoleList')
  async getRoleList(
    @Ctx() ctx: Context,
    @Body() body: GetRoleListBody
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
      const role = await RoleModel.findAndCountAll({
        where: {
          ...searchObj,
          ...nameFilter,
        },
        limit,
        offset,
      });
      return resMsg(200, role, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/addRole')
  public async addRole(
    @Ctx() ctx: Context,
    @Body() body: AddRoleBody
  ) {
    try {
      const { name, remark, permissionsID } = body;
      const adminUserId = ctx.userInfo.id;
      let role = new RoleModel();
      role = addAttr(role, { name, adminUserId, remark, permissionsID });
      await role.save();
      return resMsg(200, role, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/updateRole')
  public async updateRole(
    @Ctx() ctx: Context,
    @Body() body: UpdateRoleBody
  ) {
    try {
      const { id, name, remark, permissionsID } = body;
      let role = await RoleModel.findByPk(id);
      role = updateAttr(role, { id, name, remark, permissionsID });
      await role.save();
      return resMsg(200, role, 1);
    } catch (error) {
      return resMsg();
    }
  }

  @Post('/deleteRole')
  public async deleteRole(
    @Ctx() ctx: Context,
    @Body() body: DeleteRoleBody
  ) {
    try {
      await RoleModel.destroy({
        where: { id: typeof body.id === 'number' || typeof body.id === 'number' ? body.id : { [Op.in]: body.id } },
      })
      return resMsg(200, [], 1);
    } catch (error) {
      return resMsg();
    }
  }
}