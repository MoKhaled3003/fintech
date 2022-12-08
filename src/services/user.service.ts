import User, { IUser } from "../models/user.schema";
import ResponseError from "../common/response_error";
import { Injectable } from "@tsed/di";
@Injectable()
export class UserService {
  async addUser(user: IUser) {
    return await User.create(user);
  }

  async getUser(email: string) {
    return await User.findOne({
      email,
    });
  }

  async updateUser(updateUser: any) {
    const user = await User.findOne({ _id: updateUser._id });
    if (!user) {
      throw new ResponseError("user not exist");
    }
    return User.findOneAndUpdate(
      { _id: updateUser._id },
      {
        $set: {
          email: updateUser.email,
          roles: updateUser.roles,
        },
      },
      { new: true }
    );
  }

  async deleteUser(email: string) {
    return await User.deleteOne({
      email,
    });
  }
}
