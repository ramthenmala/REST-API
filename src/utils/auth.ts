import crypto from 'crypto'
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is not defined.");
}

/**
 * Generate a random string using crypto's randomBytes method.
 * 
 * @returns {string} A base64 encoded random string.
 */
export const generateRandomString = (): string => {
    return crypto.randomBytes(128).toString('base64');
};

/**
 * Create an HMAC hash using the SHA-256 algorithm.
 * 
 * @param {string} salt - The salt used for hashing.
 * @param {string} password - The password to be hashed.
 * @returns {string} The resulting HMAC hash in hexadecimal format.
 */
export const createHmacHash = (salt: string, password: string): string => {
    if (!salt || !password) {
        throw new Error('Both salt and password must be provided.');
    }
    return crypto
        .createHmac('sha256', [salt, password].join('/'))
        .update(SECRET_KEY)
        .digest('hex');
};