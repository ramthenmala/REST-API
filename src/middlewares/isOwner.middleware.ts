import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

/**
 * Middleware to check if the authenticated user is the owner of a resource.
 * This is used to protect routes that should only be accessible to the owner.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const currentUserId = get(req, 'identity._id');

        if (!currentUserId) {
            return res.status(403).json({
                status: 'ERROR',
                message: 'Access denied: No user is currently authenticated.'
            });
        }

        if (currentUserId.toString() !== id) {
            return res.status(403).json({
                status: 'ERROR',
                message: 'Access denied: You do not own this resource.'
            });
        }

        return next();
    } catch (error) {
        console.error('Error in isOwner middleware:', error);
        // Respond with a 400 Bad Request status in case of an error
        return res.status(400).json({
            status: 'ERROR',
            message: 'Bad request: An error occurred while verifying ownership.'
        });
    }
};
