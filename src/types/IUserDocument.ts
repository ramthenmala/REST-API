import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    candidatePassword(candidatePassword: string): Promise<Boolean>;
}