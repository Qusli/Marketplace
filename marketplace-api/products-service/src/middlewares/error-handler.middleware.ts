import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/Logger";

const logger = new Logger()

export function ErrorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.message)
    logger.error(err.stack)

    if (res.headersSent) {
        return next(err)
    }

    res.status(500).json({
        status: 500,
        message: "Server error"
    })
}