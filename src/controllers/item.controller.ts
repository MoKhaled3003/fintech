import { ItemService } from "../services/item.service";
import { IItem } from "../models/item.schema";
import { CustomAuthMiddleware } from "../common/authentication";
import { Get, Post, Put, Delete, string } from "@tsed/schema";
import { BodyParams, QueryParams, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authorizer } from "../common/authorization";

@Controller("/item")
@UseAuth(CustomAuthMiddleware, {role: "globalManager"})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseAuth(Authorizer, {action: "create", resource: "item"})
  async addItem(@BodyParams() createItem: IItem) {
    const item = await this.itemService.addItem(createItem);
    return item;
  }

  @Get()
  @UseAuth(Authorizer, {action: "read", resource: "item"})
  async getItem(@QueryParams("id") id: string) {
    const item = await this.itemService.getItem(id.toString());
    return item;
  }

  @Put()
  @UseAuth(Authorizer, {action: "update", resource: "item"})
  async updateItem(@BodyParams() updateItem: IItem) {
    const item = await this.itemService.updateItem(updateItem);
    return item;
  }

  @Delete()
  @UseAuth(Authorizer, {action: "delete", resource: "item"})
  async deleteItem(@QueryParams("id") id: string) {
    await this.itemService.deleteItem(id.toString());
    return { msg: "item has been deleted" };
  }
}
