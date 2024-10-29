import { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';
import logStatus from '../utils/logStatus';

/**
 * Middleware to check if a user is authenticated based on their session token.
 *
 * This function retrieves the session token from the request cookies and verifies 
 * it against the database. If valid, it adds the user's information to the request 
 * object, allowing subsequent middleware or route handlers to access it.
 *
 * If the session token is missing or invalid, the middleware responds with a 403 
 * Forbidden status and a message indicating the reason.
 *
 * @param req - Express request object, expected to contain cookies with session token.
 * @param res - Express response object, used to send HTTP responses.
 * @param next - Next function to pass control to the next middleware or route handler.
 */
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the session token from the cookies
        // Retrieve cookie name from .env or use a default
        const cookieName = process.env.COOKIE_NAME || 'USER_SESSION_TOKEN';
        const sessionToken = req.cookies[cookieName];

        // If no session token is found, respond with a 403 Forbidden status
        if (!sessionToken) {
            logStatus.warn('Authentication failed: No session token found.');
            return res.status(403).json({ status: 'ERROR', message: 'Forbidden: No session token provided.' });
        }

        // Validate the session token by checking for the corresponding user in the database
        const existingUser = await getUserBySessionToken(sessionToken);

        // If no user is found with the session token, respond with a 403 Forbidden status
        if (!existingUser) {
            logStatus.warn('Authentication failed: Invalid session token.');
            return res.status(403).json({ status: 'ERROR', message: 'Forbidden: Invalid session token.' });
        }

        // Merge the authenticated user's information into the request object
        merge(req, { identity: existingUser });

        // Proceed to the next middleware or route handler
        return next();
    } catch (error) {
        // Log the error details for debugging purposes
        logStatus.error('Authentication Middleware Error:', error);
        // Respond with a 500 Internal Server Error if an exception occurs
        return res.status(500).json({ status: 'ERROR', message: 'Internal Server Error. Please try again later.' });
    }
}
