import { NextFunction, Request, Response } from "express";
import Database from "../loaders/v1/database";
import jwt from "jsonwebtoken";
import { decoded, Dbresp } from "../interfaces/checkUserScope";

export function checkUserScope(scopeVal: string) {
  // checks if the signed in user has the required scope to access endpoints
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.send("no token");
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded: string | jwt.JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!
      );
      // receive the userId and roleId of the user
      const { _id, roleId } = decoded as decoded;
      console.log(roleId, _id);

      const resp = (await Database.models.role.findOne({
        where: {
          _id: roleId,
        },
      })) as Dbresp | null;

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
  };
}
