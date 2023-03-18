import Env from "./loaders/v1/env";
import server from "./server";

(async () => {
    const app = await server();

    app.listen(Env.variable.PORT, () => {
        console.log(`Running on port ${Env.variable.PORT}`);
    })
})()