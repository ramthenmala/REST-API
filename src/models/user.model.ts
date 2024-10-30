import mongoose from "mongoose";
import { IUser } from "../types/user.interface";

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);