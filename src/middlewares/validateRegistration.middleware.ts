import { z } from 'zod';
import registerSchema from '../schema/users.schema';

/**
 * Middleware to validate the registration request body against the defined schema.
 * This ensures that the request contains valid data before proceeding to the handler.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const validateRegistration = (req: any, res: any, next: any) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        req.body = validatedData;

        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Validation Error: The request body is not valid.',
                errors: error.errors,
            });
        }

        console.error('Unexpected error during validation:', error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal Server Error: An unexpected error occurred.',
        });
    }
};
