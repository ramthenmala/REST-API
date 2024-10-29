import mongoose from "mongoose";
import logStatus from "./logStatus";
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
    const dbUri = process.env.MOGOOSE_DB_URI

    try {
        await mongoose.connect(dbUri);
        logStatus.info('DB Connected Successfully')
    } catch (error) {
        logStatus.error('Could not connect db')
        process.exit(1)
    }
}

export default connect;