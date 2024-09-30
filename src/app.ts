import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logStatus from './utils/logStatus';
import routes from './routes';

const port = config.get<number>('port')

const app = express();

app.use(express.json())

app.listen(port, async () => {
    logStatus.info(`App is running at http://localhost:${port}`)
    await connect();
    routes(app);
})