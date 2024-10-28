import { FilterQuery } from 'mongoose';
import SessionModel from '../models/session.model';
import logStatus from '../utils/logStatus';
import { ISessionDocument } from '../types/ISessionDocument';

export async function createSessionService(userId: string, userAgent: string) {
    try {
        const session = await SessionModel.create({ user: userId, userAgent });
        return session;
    } catch (e: any) {
        logStatus.error('Error creating session:', e.message);
        throw new Error('Could not create session');
    }
}

export async function findSessions(query: FilterQuery<ISessionDocument>) {
    return SessionModel.find(query).lean();
}