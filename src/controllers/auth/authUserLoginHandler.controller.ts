import { Request, Response } from "express";
import logStatus from "../../utils/logStatus";
import { getUserByEmail } from "../../db/users";
import { authentication, random } from "../../utils/auth";

/**
 * Handler for user login authentication.
 * 
 * This function authenticates a user by validating their email and password.
 * If authentication succeeds, a session token is generated and stored in a cookie.
 * The function responds with the user data on success or an appropriate error message on failure.
 * 
 * @param req - Express request object, expected to contain `email` and `password` in the body.
 * @param res - Express response object, used to send JSON responses with status codes.
 * 
 * @returns Response containing user data on successful login or an error message if login fails.
 */
const authUserLoginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            logStatus.warn('Login failed: Missing email or password.');
            return res.status(400).json({ message: 'Invalid details: email and password are required.' });
        }

        // Retrieve the user by email, selecting sensitive fields for authentication
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            logStatus.warn(`Login failed: No account found for email ${email}.`);
            return res.status(403).json({ status: 'ERROR', message: 'No account found. Please create an account.' });
        }

        // Validate password
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication?.password !== expectedHash) {
            logStatus.warn(`Login failed for user ID ${user._id}: Incorrect password.`);
            return res.status(403).json({ status: 'ERROR', message: 'Invalid password. Please try again.' });
        }

        // Generate a new session token and update user
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        // Retrieve cookie name from .env or use a default
        const cookieName = process.env.COOKIE_NAME || 'USER_SESSION_TOKEN';

        // Set session token in cookie
        res.cookie(cookieName, user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        // Respond with user details (excluding sensitive information)
        return res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username
        }).end();
    } catch (error) {
        logStatus.error('Authentication Handler Error:', error);
        return res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
    }
}

export default authUserLoginHandler;
