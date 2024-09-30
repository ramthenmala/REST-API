import logger from 'pino';
import dayjs from 'dayjs';

const logStatus = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
        },
    },
    base: {
        pid: false,
    },
    timestamp: () => `, "time":"${dayjs().format()}"`,
});

export default logStatus;
