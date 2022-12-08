import ResponseError from "../common/response_error";
import Item, { IItem } from "../models/item.schema";
import { Injectable } from "@tsed/di";
@Injectable()
export class ItemService {
  async addItem(item: IItem) {
    return await Item.create(item);
  }

  async getItem(id: string) {
    return await Item.findOne({
      _id: id,
    });
  }

  async updateItem(updateItem: any) {
    const item = await Item.findOne({ _id: updateItem._id });
    if (!item) {
      throw new ResponseError("item not exist");
    }
    return Item.findOneAndUpdate(
      { _id: updateItem._id },
      {
        $set: {
          name: updateItem.name,
          parentId: updateItem.parentId,
        },
      },
      { new: true }
    );
  }

  async deleteItem(id: string) {
    return await Item.deleteOne({
      _id: id,
    });
  }
}
