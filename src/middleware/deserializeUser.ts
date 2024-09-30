import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    let accessToken = null;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        accessToken = authorizationHeader.split(' ')[1];
    }

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded;
    }
    return next();
}

export default deserializeUser;