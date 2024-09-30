import jwt from 'jsonwebtoken';
import config from 'config';
import logStatus from './logStatus';

const pvtKey = config.get<string>('privateKey')
const pbcKey = config.get<string>('publicKey')

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, pvtKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, pbcKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        logStatus.error('JWT Expired');
        return {
            valid: false,
            expired: error.message === 'JWT Expired',
            decoded: null
        }
    }
}