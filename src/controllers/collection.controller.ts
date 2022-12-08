import { CollectionService } from "../services/collection.service";
import { CustomAuthMiddleware } from "../common/authentication";
import { ICollection } from "../models/collection.schema";
import { Get, Post, Put, Delete } from "@tsed/schema";
import { BodyParams, QueryParams, Use, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";
import { CustomAuthorizationMiddleware } from "../common/authorization";

@Controller("/collection")
@UseAuth(CustomAuthMiddleware, {role: "globalManager"})
@Use(CustomAuthorizationMiddleware)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async addCollection(@BodyParams() createCollection: ICollection) {
    const collection = await this.collectionService.addCollection(
      createCollection
    );
    return collection;
  }

  @Get()
  async getCollection(@QueryParams() id: string) {
    const collection = await this.collectionService.getCollection(
      id.toString()
    );
    return collection;
  }

  @Put()
  async updateCollection(@BodyParams() updateCollection: ICollection) {
    const collection = await this.collectionService.updateCollection(
      updateCollection
    );
    return { collection };
  }

  @Delete()
  async deleteCollection(@QueryParams() id: string) {
    await this.collectionService.deleteCollection(id.toString());
    return { msg: "collection has been deleted" };
  }
}
