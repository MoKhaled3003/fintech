import { ItemService } from "../services/item.service";
import { IItem } from "../models/item.schema";
import { CustomAuthMiddleware } from "../common/authentication";
import { Get, Post, Put, Delete, string } from "@tsed/schema";
import { BodyParams, QueryParams, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";

@Controller("/item")
@UseAuth(CustomAuthMiddleware, {role: "globalManager"})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async addItem(@BodyParams() createItem: IItem) {
    const item = await this.itemService.addItem(createItem);
    return item;
  }

  @Get()
  async getItem(@QueryParams("id") id: string) {
    const item = await this.itemService.getItem(id.toString());
    return item;
  }

  @Put()
  async updateItem(@BodyParams() updateItem: IItem) {
    const item = await this.itemService.updateItem(updateItem);
    return item;
  }

  @Delete()
  async deleteItem(@QueryParams("id") id: string) {
    await this.itemService.deleteItem(id.toString());
    return { msg: "item has been deleted" };
  }
}
