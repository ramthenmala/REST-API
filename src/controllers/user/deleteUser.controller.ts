import { Request, Response } from "express";
import { deleteUserById } from "../../db/users";

const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await deleteUserById(id);

        if (!user) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'User not found. Unable to delete.'
            });
        }

        return res.status(200).json({
            message: 'Your account was deleted successfully.'
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Failed to delete user. Please try again later.'
        });
    }
}

export default deleteUserHandler;