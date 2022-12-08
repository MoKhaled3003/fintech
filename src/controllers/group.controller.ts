import { GroupService } from "../services/group.service";
import { CustomAuthMiddleware } from "../common/authentication";
import { Get, Post, Put, Delete, string } from "@tsed/schema";
import { BodyParams, QueryParams, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";
import { IGroup } from "../models/group.schema";
import { Authorizer } from "../common/authorization";
@Controller("/group")
@UseAuth(CustomAuthMiddleware, {role: "globalManager"})
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseAuth(Authorizer, {action: "create", resource: "group"})
  async addGroup(@BodyParams() createGroup: IGroup) {
    const group = await this.groupService.addGroup(createGroup);
    return group;
  }

  @Get()
  @UseAuth(Authorizer, {action: "read", resource: "group"})
  async getGroup(@QueryParams() id: string) {
    const group = await this.groupService.getGroup(id.toString());
    return group;
  }

  @Put()
  @UseAuth(Authorizer, {action: "update", resource: "group"})
  async updateGroup(@BodyParams() updateGroup: IGroup) {
    const group = await this.groupService.updateGroup(updateGroup);
    return group;
  }

  @Delete()
  @UseAuth(Authorizer, {action: "delete", resource: "group"})
  async deleteGroup(@QueryParams() id: string) {
    await this.groupService.deleteGroup(id.toString());
    return { msg: "group has been deleted" };
  }
}
