import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken: string;
    };
}
