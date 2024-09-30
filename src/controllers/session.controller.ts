import { Request, Response } from 'express';
import logStatus from '../utils/logStatus';
import { validatePassword } from '../service/user.service';
import { createSessionService, findSessions } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionController(req: Request, res: Response) {
    try {
        // Validate users password
        const user = await validatePassword(req.body)
        if (!user) {
            return res.status(401).send('Invalid Email or Password')
        }

        // create a session
        const session = await createSessionService(user._id as string, req.get('user-agent') as string || '')

        if (!session) {
            return res.status(500).send('Could not create session. Please try again later.');
        }

        // create an access token
        const accessToken = signJwt({
            ...user,
            session: session._id,
            expiresIn: config.get<string>('accessTokenTtl')
        });
        // create a refresh token
        const refreshToken = signJwt({
            ...user,
            session: session._id,
            expiresIn: config.get<string>('refreshTokenTtl')
        });

        // return access & refresh token
        return res.status(200).json({
            accessToken, refreshToken
        })

    } catch (e: any) {
        logStatus.error('Create User Controller Error');
        return res.status(409).send(e.message)
    }
}

export async function getUserSessionController(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;

        const sessions = await findSessions({ user: userId, valid: true });
        return res.send(sessions);

    } catch (error) {
        logStatus.error('getSession Controller errored');

    }
}