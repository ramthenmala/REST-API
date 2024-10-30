import { Request, Response } from "express";
import logStatus from "../utils/logStatus";

/**
 * Handles health check requests to verify the status of the application.
 * This endpoint is typically used for monitoring and to ensure that the server is running.
 * 
 * @param _ - The request object (unused in this function).
 * @param res - The response object used to send responses back to the client.
 * 
 * @returns A JSON response indicating the health status of the application.
 */
const healthHandler = (_: Request, res: Response): Response | void => {
    try {
        return res.status(200).json({ status: 'OK' });
    } catch (error: any) {
        logStatus.error('Health Check Error: ', error);

        // Respond with a status 500 and an error message if an exception is thrown
        return res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
    }
};

export default healthHandler;
