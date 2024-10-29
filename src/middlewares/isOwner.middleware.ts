import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const currentUserId = get(req, 'identity._id');

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403)
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}