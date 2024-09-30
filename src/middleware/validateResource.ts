import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from 'zod';

function validateResource(schema: AnyZodObject) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            })
            next();
        } catch (e: any) {
            return res.status(400).send(e.error)
        }

    }
}

export default validateResource;