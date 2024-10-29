import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import dotenv from 'dotenv';

import connect from './utils/connect';
import logStatus from './utils/logStatus';
import routes from './routes';

dotenv.config();

const appPort = process.env.PORT || 4001;

const app = express();

app.use(cors({
    credentials: true
}))

app.use(cookieParser());
app.use(bodyParser.json());

app.listen(appPort, async () => {
    logStatus.info(`App is running at http://localhost:${appPort}`)
    await connect();
    routes(app);
})