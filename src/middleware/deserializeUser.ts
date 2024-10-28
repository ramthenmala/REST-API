import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { get } from 'lodash';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

        if (!accessToken) {
            return next();
        }

        const { decoded, expired } = verifyJwt(accessToken);

        if (decoded) {
            res.locals.user = decoded;
            return next();
        }

        return next();
    } catch (error) {
        console.error('Error during JWT deserialization:', error);
        return next();
    }
};

export default deserializeUser;
