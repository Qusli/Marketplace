import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/Logger";

const logger = new Logger()

export function LogRequestMiddleware(req: Request, _: Response, next: NextFunction) {
    logger.request(req.originalUrl)
    return next()
}