import ResponseError from "./response_error";
import { Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { AccessControl } from "accesscontrol";
import _ from "lodash"
let grantArray = [
  {
    role: "manager",
    resource: "collection",
    action: "read:any",
    attributes: "*",
  },
  { role: "globalManager", resource: "collection", action: "*", attributes: "*" },
  { role: "globalManager", resource: "role", action: "*", attributes: "*" },
  { role: "globalManager", resource: "group", action: "*", attributes: "*" },
  { role: "globalManager", resource: "items", action: "*", attributes: "*" },
];
let grantsObject = {
    globalManager: {
        collection: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        role: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        group: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        item: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        user: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
    },
    manager: {
        collection: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        group: {
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        item: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
    },
    regular: {
        collection: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        item: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
    }
};

export const ac = new AccessControl(grantsObject);

@Middleware()
export class Authorizer implements MiddlewareMethods {
  public async use(@Req() request: Req, @Context() ctx: Context) {
    const options = ctx.endpoint.get(Authorizer) || {};
    // @ts-ignore: Unreachable code error
    const permission = ac.can(ctx.userRole)[options.action](options.resource);
    if (!permission.granted) {
      throw new ResponseError("Forbidden");
    }
    ctx.attributes = permission.attributes
    console.log(permission.attributes)
  }
}
