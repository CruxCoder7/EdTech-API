import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken'
import db from '../models'
const Role = db.role;

type decodedProps = {
    _id: string,
    roleId: string
}

type respProps = {
    id: string,
    scopes: string[]
}

export function checkUserScope(scopeVal: string) {
    // checks if the signed in user has the required scope to access endpoints
    return async (req: Request, res: Response, next: NextFunction) => {
        if (Role) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.send("no token");
            }
            const token = authHeader.split(" ")[1];
            try {
                const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
                // receive the userId and roleId of the user
                const { _id, roleId } = decoded as decodedProps;
                const resp = await Role.findOne({
                    where: {
                        _id: roleId,
                    },
                }) as respProps | null;

                const scopes = resp?.scopes;
                if (scopes?.includes(scopeVal)) {
                    res.locals.id = _id;
                    return next();
                }
                return res.json({
                    status: false,
                    errors: [{ message: "You don't have access" }],
                });
            } catch (error) {
                return res.json({
                    status: false,
                    errors: [{ message: "fake token" }],
                });
            }
        }
    };
}