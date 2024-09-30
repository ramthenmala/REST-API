import createUserController from "./controllers/user.controller";
import healthController from "./controllers/health.controller";
import validateResource from "./middleware/validateResource";
import createUserSchema from "./schema/user.schema";
import { createUserSessionController, getUserSessionController } from "./controllers/session.controller";
import createSessionSchema from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

function routes(app: any) {
    app.get('/health', healthController);
    app.post('/api/users', validateResource(createUserSchema), createUserController);
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionController);

    app.get('/api/sessions', requireUser, getUserSessionController);
}

export default routes;