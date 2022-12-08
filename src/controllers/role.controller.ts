import { RoleService } from "../services/role.service";
import { IRole } from "../models/role.schema";
import { CustomAuthMiddleware } from "../common/authentication";
import { Get, Post, Put, Delete, string } from "@tsed/schema";
import { BodyParams, QueryParams, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authorizer } from "../common/authorization";

@Controller("/role")
@UseAuth(CustomAuthMiddleware, {role: "globalManager"})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseAuth(Authorizer, {action: "create", resource: "role"})
  async addRole(@BodyParams() createRole: IRole) {
    const role = await this.roleService.addRole(createRole);
    return role;
  }

  @Get()
  @UseAuth(Authorizer, {action: "read", resource: "role"})
  async getRole(@QueryParams("id") id: string) {
    const role = await this.roleService.getRole(id.toString());
    return role;
  }

  @Put()
  @UseAuth(Authorizer, {action: "update", resource: "role"})
  async updateRole(@BodyParams() updateRole: IRole) {
    const role = await this.roleService.updateRole(updateRole);
    return role;
  }

  @Delete()
  @UseAuth(Authorizer, {action: "delete", resource: "role"})
  async deleteRole(@QueryParams("id") id: string) {
    await this.roleService.deleteRole(id.toString());
    return { msg: "role has been deleted" };
  }
}
