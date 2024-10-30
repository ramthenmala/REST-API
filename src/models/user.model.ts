import mongoose from "mongoose";
import { IUser } from "../types/user.interface";

// Define the User schema
const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

// Create the User model from the schema
export const UserModel = mongoose.model<IUser>('User', UserSchema);