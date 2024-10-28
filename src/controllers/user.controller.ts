import { Request, Response } from 'express';
import logStatus from '../utils/logStatus';
import { createUserService } from '../service/user.service';
import { CreateUserInput } from '../types/ICreateUserInput';
import UserModel from '../models/user.model';

async function createUserController(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email })

        if (existingUser) {
            logStatus.warn("User creation failed: user already exists with this email", req.body.email);
            return res.status(400).json({
                message: 'You have an account with us. Please try to login.'
            });
        }

        const user = await createUserService(req.body);
        
        const userWithoutPassword = {
            ...user.toObject(),
            password: undefined
        };

        return res.status(201).json(userWithoutPassword);
    } catch (e: any) {
        logStatus.error('Create User Controller Error');
        return res.status(409).send(e.message)
    }
}

export default createUserController;