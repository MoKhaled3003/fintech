
import ResponseError from "./response_error";
import { Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { AccessControl } from 'accesscontrol';
let grantArray = [
    { role: 'manager', resource: 'collection', action: 'POST:any', attributes: '*' },
    { role: 'writer', resource: 'post', action: 'create:own', attributes: '*' },
    { role: 'writer', resource: 'post', action: 'update:own', attributes: '*' },
    { role: 'writer', resource: 'post', action: 'delete:own', attributes: '*' },
    { role: 'editor', resource: 'post', action: 'read:any', attributes: '*' },
    { role: 'editor', resource: 'post', action: 'create:any', attributes: '*' },
    { role: 'editor', resource: 'post', action: 'update:any', attributes: '*' },
    { role: 'editor', resource: 'post', action: 'delete:any', attributes: '*' },
  ]
  
 export const ac = new AccessControl(grantArray);
  
@Middleware()
export class CustomAuthorizationMiddleware implements MiddlewareMethods {
    public async use(@Req() request: Req, @Context() ctx: Context) {
        const pathElements =  request.route.path.split('/')
        console.log("zby", request.method)
        const permission = ac.can(ctx.userRole).readAny(pathElements[pathElements.length - 1]);
        if (permission.granted) {
           
        } else {
            throw new ResponseError("Forbidden")
        }
    
    }
}