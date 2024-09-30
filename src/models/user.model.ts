import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserDocument } from "../types/IUserDocument";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const user = this as IUserDocument;

    if (!user.isModified('password')) {
        return next();
    };

    try {
        const saltFactor = config.get<number>('saltWorkFactor');
        const salt = await bcrypt.genSalt(saltFactor);
        const hash = await bcrypt.hashSync(user.password, salt);

        user.password = hash;
        return next()
    } catch (error: any) {
        next(error)
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as IUserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
};

const UserModel = mongoose.model<IUserDocument>('User', userSchema);

export default UserModel;