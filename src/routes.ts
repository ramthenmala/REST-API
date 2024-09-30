import createUserController from "./controllers/user.controller";
import healthController from "./controllers/health.controller";
import validateResource from "./middleware/validateResource";
import createUserSchema from "./schema/user.schema";

function routes(app: any) {
    app.get('/health', healthController);
    app.post('/api/users', validateResource(createUserSchema), createUserController);
}

export default routes;