import { Configuration } from "@tsed/di";
import { CollectionController } from "./controllers/collection.controller";
import { GroupController } from "./controllers/group.controller";
import { ItemController } from "./controllers/item.controller";
import { RoleController } from "./controllers/role.controller";
import { UserController } from "./controllers/user.controller";

@Configuration({
  mount: {
    "/rest/v0": [
      UserController,
      ItemController,
      GroupController,
      CollectionController,
      RoleController
    ]
  },
  middlewares: [
    "json-parser",
    "text-parser"
  ]
})
export class Server {

}
