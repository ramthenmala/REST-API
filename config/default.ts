import { generateKeyPairSync } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

export default {
    port: 1337,
    dbUri: "mongodb+srv://rammongodbvid:aPgzzZMMwRVStbYt@booking-app-db.ksbpb.mongodb.net/?retryWrites=true&w=majority&appName=booking-app-db",
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshToeknTtl: '1yr',
    publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
    privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }),
};