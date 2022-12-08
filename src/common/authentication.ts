import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user.schema";
import ResponseError from "./response_error";

import { Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { RoleService } from "../services/role.service";

const SECRET_KEY = "hakonaMatata"; // can be stored in env variable

@Middleware()
export class CustomAuthMiddleware implements MiddlewareMethods {
    constructor(private readonly roleService: RoleService) { }
    public async use(@Req() request: Req, @Context() ctx: Context) {
        const token = request.header("Authorization");
        
        if (!token) {
            throw new ResponseError(" there is no valid token");
        }

        const decoded = jwt.verify(token, SECRET_KEY) as {email: string,role: string,iat: number};
        const role = await this.roleService.getRole(decoded.role)
        ctx.token = decoded;
        ctx.userRole = role?.name
    }
}

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const createToken = async (user: IUser) => {
    console.log(user);
    let token = jwt.sign(user, SECRET_KEY);
    return token;
};
