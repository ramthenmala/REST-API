import mongoose from "mongoose";
import config from 'config';
import logStatus from "./logStatus";

async function connect() {
    const dbUri = config.get<string>('dbUri')

    try {
        await mongoose.connect(dbUri);
        logStatus.info('DB Connected Successfully')
    } catch (error) {
        logStatus.error('Could not connect db')
        process.exit(1)
    }
}

export default connect;