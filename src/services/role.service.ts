import ResponseError from "../common/response_error";
import Role, { IRole } from "../models/role.schema";
import { Injectable } from "@tsed/di";
@Injectable()
export class RoleService {
  async addRole(role: IRole) {
    return await Role.create(role);
  }

  async getRole(id: string) {
    return await Role.findOne({
      _id: id,
    });
  }

  async updateRole(updateRole: any) {
    const role = await Role.findOne({ _id: updateRole._id });
    if (!role) {
      throw new ResponseError("role not exist");
    }
    return Role.findOneAndUpdate(
      { _id: updateRole._id },
      {
        $set: {
          name: updateRole.name,
          parentId: updateRole.parentId,
        },
      },
      { new: true }
    );
  }

  async deleteRole(id: string) {
    return await Role.deleteOne({
      _id: id,
    });
  }
}
