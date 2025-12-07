import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyToken } from "../utils/jwt.utils.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({"message": "No token provided!"});
    }

    try {
        const decoded = verifyToken(token);
        if (typeof decoded !== "string" && "id" in decoded) {
            res.locals.user = decoded.id;
            next();
        } else {
            res.status(401).json({"message": "Invalid Token!"});
        }
    } catch(err: any) {
        res.status(401).json({"message": "Invalid Token!"});
    }
}