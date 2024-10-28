import UserModel from '../models/user.model';
import { CreateUserInput } from '../types/ICreateUserInput';
import { IUserDocument } from '../types/IUserDocument';
import logStatus from '../utils/logStatus';

export async function createUserService(input: CreateUserInput) {
    try {
        return await UserModel.create(input)
    } catch (e: any) {
        logStatus.error(e);
        throw new Error(e)
    }
}

export async function validatePassword({ email, password }: Pick<IUserDocument, 'email' | 'password'>) {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return false
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) return false;

        const { password: omittedPassword, ...userWithoutPassword } = user.toObject();

        return userWithoutPassword;

    } catch (error) {
        console.log(error)
    }
}