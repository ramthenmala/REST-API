import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../db/users";
import { authentication, random } from "../../utils/auth";
import logStatus from "../../utils/logStatus";

const authUserRegisterHandler = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({
                message: 'Invalid details'
            });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
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
        return res.status(200).json(user);
    } catch (error: any) {
        logStatus.error('Authentication Handler Error: ', error);
        return res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
    }
};

export default authUserRegisterHandler;