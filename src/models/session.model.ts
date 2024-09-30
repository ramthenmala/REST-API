import mongoose from "mongoose";
import { ISessionDocument } from "../types/ISessionDocument";

const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        valid: { type: Boolean, default: true },
        userAgent: { type: String },
    },
    {
        timestamps: true,
    }
);

const SessionModel = mongoose.model<ISessionDocument>("Session", sessionSchema);

export default SessionModel;