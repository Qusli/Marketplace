import { NextFunction, Request, Response } from "express"

export function SetHeaderJsonMiddleware(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Content-Type', 'application/json')
    next()
}