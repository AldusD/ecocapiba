import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_ACCESS_EXPIRATION = parseInt(process.env.JWT_ACCESS_EXPIRATION);
export function generateAccessToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
        expiresIn: JWT_ACCESS_EXPIRATION
    });
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
}
//# sourceMappingURL=jwt.utils.js.map