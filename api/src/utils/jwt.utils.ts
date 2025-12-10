import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const JWT_ACCESS_EXPIRATION = parseInt(process.env.JWT_ACCESS_EXPIRATION as string);

export function generateAccessToken(userId: number) {
    return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
        expiresIn: JWT_ACCESS_EXPIRATION
    })
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET_KEY);
}