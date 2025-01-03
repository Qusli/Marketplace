import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/Logger";

const logger = new Logger()

export function LogErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack)
    next(err)
}