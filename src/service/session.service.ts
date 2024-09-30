import SessionModel from '../models/session.model';
import logStatus from '../utils/logStatus';

export async function createSessionService(userId: string, userAgent: string) {
    try {
        const session = await SessionModel.create({ user: userId, userAgent });
        return session ? session.toObject() : null;
    } catch (e: any) {
        logStatus.error('Error creating session:', e.message);
        throw new Error('Could not create session');
    }
}