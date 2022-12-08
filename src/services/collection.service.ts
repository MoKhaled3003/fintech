import ResponseError from "../common/response_error";
import Collection, { ICollection } from "../models/collection.schema";
import { Injectable } from "@tsed/di";
@Injectable()
export class CollectionService {
  async addCollection(collection: ICollection) {
    return await Collection.create(collection);
  }

  async getCollection(id: string) {
    return await Collection.findOne({
      _id: id,
    });
  }

  async updateCollection(updateCollection: any) {
    const collection = await Collection.findOne({ _id: updateCollection._id });
    if (!collection) {
      throw new ResponseError("collection not exist");
    }
    return Collection.findOneAndUpdate(
      { _id: updateCollection._id },
      {
        $set: {
          name: updateCollection.name,
        },
      },
      { new: true }
    );
  }

  async deleteCollection(id: string) {
    return await Collection.deleteOne({
      _id: id,
    });
  }
}
