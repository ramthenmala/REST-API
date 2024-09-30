import { Request, Response } from 'express';
import logStatus from '../utils/logStatus';
import { createUserService } from '../service/user.service';
import { CreateUserInput } from '../types/ICreateUserInput';

async function createUserController(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
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