import { Get, Post, Put, Delete } from "@tsed/schema";
import { BodyParams, QueryParams, UseAuth } from "@tsed/common";
import { Controller } from "@tsed/di";
import { UserService } from "../services/user.service";
import { createToken, CustomAuthMiddleware } from "../common/authentication";
import { IUser } from "../models/user.schema";
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@BodyParams() createUser: IUser) {
    const user = await this.userService.addUser(createUser);
    const token = await createToken(createUser);
    return {
      user,
      token,
    };
  }

  @Get()
  @UseAuth(CustomAuthMiddleware, {role: "globalManager"})
  async getUser(@QueryParams("email") email: string) {
    if (email !== undefined) {
      const user = await this.userService.getUser(email.toString());
      return user;
    }
  }

  @Put()
  @UseAuth(CustomAuthMiddleware, {role: "globalManager"})
  async updateUser(@BodyParams() updateUser: IUser) {
    const user = await this.userService.updateUser(updateUser);
    return user;
  }

  @Delete()
  @UseAuth(CustomAuthMiddleware, {role: "globalManager"})
  async deleteUser(@QueryParams("email") email: string) {
    await this.userService.deleteUser(email.toString());
    return { msg: "user has been deleted" };
  }
}
