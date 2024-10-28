import jwt from 'jsonwebtoken';
import config from 'config';
import logStatus from './logStatus';

const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')

export function signJwt(payload: Record<string, any>, options?: jwt.SignOptions) {
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (error: any) {
        logStatus.error(`JWT Verification Error: ${error}`);

        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
}