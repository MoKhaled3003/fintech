import ResponseError from "../common/response_error";
import Group, { IGroup } from "../models/group.schema";
import { Injectable } from "@tsed/di";
@Injectable()
export class GroupService {
  async addGroup(group: IGroup) {
    return await Group.create(group);
  }

  async getGroup(id: string) {
    return await Group.findOne({
      _id: id,
    });
  }

  async updateGroup(updateGroup: any) {
    const group = await Group.findOne({ _id: updateGroup._id });
    if (!group) {
      throw new ResponseError("group not exist");
    }
    return Group.findOneAndUpdate(
      { _id: updateGroup._id },
      {
        $set: {
          name: updateGroup.name,
          collectionIds: updateGroup.collectionIds,
        },
      },
      { new: true }
    );
  }

  async deleteGroup(id: string) {
    return await Group.deleteOne({
      _id: id,
    });
  }
}
