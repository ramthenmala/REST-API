import { Request, Response } from 'express';
import config from 'config';
import logStatus from '../utils/logStatus';
import { validatePassword } from '../service/user.service';
import { createSessionService, findSessions } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionController(req: Request, res: Response) {
    try {
        // Validate users password
        const user = await validatePassword(req.body)

        if (!user) {
            return res.status(401).send('Invalid Email or Password')
        }

        // create a session
        // const session = await createSessionService(user._id as string, req.get('user-agent') as string || '')
        const session = await createSessionService(user._id as string, req.get('user-agent') as string || '')

        if (!session) {
            return res.status(500).send('Could not create session. Please try again later.');
        }

        // create an access token
        const accessToken = signJwt(
            {
                ...user,
                session: session._id,
            },
            {
                expiresIn: config.get<string>('accessTokenTtl'),
            }
        );

        // create a refresh token
        const refreshToken = signJwt(
            {
                ...user,
                session: session._id,
            },
            {
                expiresIn: config.get<string>('refreshTokenTtl')
            });

        // return access & refresh token
        return res.send({
            accessToken,
            refreshToken
        })

    } catch (e: any) {
        logStatus.error('Create User Controller Error');
        return res.status(409).send(e.message)
    }
}


export async function getUserSessionController(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        console.log('User ID:', userId);
        const sessions = await findSessions({ user: userId, valid: false });

        console.log('User Sessions:', sessions);

        return res.send(sessions);
    } catch (error: any) {
        logStatus.error('Get User Session Controller Error: ' + error.message);
        return res.status(500).send({ message: 'Error retrieving sessions' });
    }
}