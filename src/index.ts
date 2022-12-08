import "reflect-metadata"
import { mongodb } from './models/mongoose';
import { Server } from "./server";
import { PlatformExpress } from "@tsed/platform-express";
import { $log } from "@tsed/common";

async function bootstrap() {
  try {
    $log.debug("Start server...");
    await mongodb();
    const platform = await PlatformExpress.bootstrap(Server, {
      // extra settings
    });

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
