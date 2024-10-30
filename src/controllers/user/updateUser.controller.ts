import { Request, Response } from "express";
import { getUserById } from "../../models/user.model";

/**
 * Handles the update of a user's username based on the user ID provided in the request parameters.
 * 
 * @param req - The request object containing the user ID in the parameters and the new username in the body.
 * @param res - The response object used to send responses back to the client.
 * 
 * @returns A JSON response indicating the outcome of the update request.
 */
const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'User not found. Unable to delete.'
            });
        }

        const user = await getUserById(id)

        user.username = username;

        await user?.save()

        return res.status(200).json({
            message: 'Your username updated successfully.'
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Failed to delete user. Please try again later.'
        });
    }
}

export default updateUserHandler;