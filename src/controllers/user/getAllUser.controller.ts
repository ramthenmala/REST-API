import { Request, Response } from "express";
import { getUsers } from "../../models/user.model";

/**
 * Handles the retrieval of all user accounts.
 * 
 * @param req - The request object used to handle the incoming request.
 * @param res - The response object used to send responses back to the client.
 * 
 * @returns A JSON response containing the list of users or an error message.
 */
const getAllUsersHanlder = async (_: Request, res: Response) => {
    try {
        const users = await getUsers();

        if (users.length === 0) {
            return res.status(403).json({
                message: 'No Usere'
            });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Failed to retrieve users. Please try again later.'
        });
    }
}

export default getAllUsersHanlder