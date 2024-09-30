import createUserController from "./controllers/user.controller";
import healthController from "./controllers/health.controller";
import validateResource from "./middleware/validateResource";
import createUserSchema from "./schema/user.schema";
import createUserSessionController from "./controllers/session.controller";
import createSessionSchema from "./schema/session.schema";

function routes(app: any) {
    app.get('/health', healthController);
    app.post('/api/users', validateResource(createUserSchema), createUserController);
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionController);
}

export default routes;