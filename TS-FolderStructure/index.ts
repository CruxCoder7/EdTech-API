import Env from "./loaders/v1/env";
import server from "./server";
import Logger from "./universe/v1/logger";

(async () => {
    const app = await server();

    app.listen(Env.variable.PORT, () => {
        Logger.instance.debug(`Running on port ${Env.variable.PORT}`);
    })
})()