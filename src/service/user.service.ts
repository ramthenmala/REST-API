import UserModel from '../models/user.model';
import { CreateUserInput } from '../types/ICreateUserInput';
import logStatus from '../utils/logStatus';

export async function createUserService(input: CreateUserInput) {
    try {
        return await UserModel.create(input)
    } catch (e: any) {
        logStatus.error(e);
        throw new Error(e)
    }
}