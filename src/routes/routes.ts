import healthHandler from "../controllers/health.controller";
import authUserRegisterHandler from "../controllers/auth/authRegistrationHandler";
import authUserLoginHandler from "../controllers/auth/authUserLoginHandler.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";

import getAllUsersHanlder from "../controllers/user/getAllUser.controller";
import deleteUserHandler from "../controllers/user/deleteUser.controller";
import updateUserHandler from "../controllers/user/updateUser.controller";
import { validateRegistration } from "../middlewares/validateRegistration.middleware";
import { validateLogin } from "../middlewares/validateLogin.middleware";

/**
 * Define the routes for the application.
 *
 * @param app - The application instance.
 */
function routes(app: any) {
    // Health check endpoint
    app.get('/api/health', healthHandler);

    // Authentication routes
    app.post('/api/auth/register', validateRegistration, authUserRegisterHandler);
    app.post('/api/auth/login', validateLogin, authUserLoginHandler);

    // User management routes
    app.get('/api/getAllUsers', isAuthenticated, getAllUsersHanlder);
    app.delete('/api/users/:id', isAuthenticated, isOwner, deleteUserHandler)
    app.patch('/api/users/:id', isAuthenticated, isOwner, updateUserHandler)
}

export default routes;