import Env from "./loaders/v1/env";
import Logger from "./universe/v1/libraries/logger";
import server from "./server";

// IIFE
(async () => {
  const app = await server();

  app.listen(Env.variable.PORT, () =>
    Logger.instance.debug(`Running on port ${Env.variable.PORT}`)
  );
})();
