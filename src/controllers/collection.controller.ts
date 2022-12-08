import { CollectionService } from "../services/collection.service";
import { CustomAuthMiddleware } from "../common/authentication";
import { ICollection } from "../models/collection.schema";
import { Get, Post, Put, Delete } from "@tsed/schema";
import { BodyParams, QueryParams, Use, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authorizer } from "../common/authorization";

@Controller("/collection")
@UseAuth(CustomAuthMiddleware, { role: "globalManager" })
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @UseAuth(Authorizer, {action: "create", resource: "collection"})
  async addCollection(@BodyParams() createCollection: ICollection) {
    const collection = await this.collectionService.addCollection(
      createCollection
    );
    return collection;
  }

  @Get()
  @UseAuth(Authorizer, {action: "read", resource: "collection"})
  async getCollection(@QueryParams() id: string) {
    const collection = await this.collectionService.getCollection(
      id
    );
    return collection;
  }

  @Put()
  @UseAuth(Authorizer, {action: "update", resource: "collection"})
  async updateCollection(@BodyParams() updateCollection: ICollection) {
    const collection = await this.collectionService.updateCollection(
      updateCollection
    );
    return { collection };
  }

  @Delete()
  @UseAuth(Authorizer, {action: "delete", resource: "collection"})
  async deleteCollection(@QueryParams() id: string) {
    await this.collectionService.deleteCollection(id.toString());
    return { msg: "collection has been deleted" };
  }
}
