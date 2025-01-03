import { NextFunction, Request, Response } from "express";

export function ClientErrorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.xhr) {
        res.status(500).json({ 
            status: 500,
            message: "Server error"
        });
    } else {
        return next(err);
    }
}
  