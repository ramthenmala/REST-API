import { Request, Response } from "express";
import { getUsers } from "../../db/users";

const getAllUsersHanlder = async (req: Request, res: Response) => {
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