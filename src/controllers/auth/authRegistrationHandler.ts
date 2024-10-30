import { Request, Response } from "express";
import { authentication, random } from "../../utils/auth";
import logStatus from "../../utils/logStatus";
import { createUser, getUserByEmail } from "../../models/user.repository";

/**
 * Handles user registration requests.
 * Validates the input, checks if the user already exists, and creates a new user if not.
 * 
 * @param req - The request object containing user registration details.
 * @param res - The response object used to send responses to the client.
 */
const authUserRegisterHandler = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            logStatus.warn('Registration failed: Invalid details provided.');
            return res.status(400).json({
                message: 'Invalid details'
            });
        }

        // Check if the user already exists by querying the database with the provided email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            logStatus.warn(`Registration failed: User with email ${email} already exists.`);
            return res.status(400).json({
                message: 'You have an account with us. Please try to login'
            });
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(201).json({
            id: user._id,
            email: user.email,
            username: user.username,
        });
    } catch (error: any) {
        logStatus.error('Authentication Handler Error: ', error);
        // Respond with a generic server error message
        return res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
    }
};

export default authUserRegisterHandler;
