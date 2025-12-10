import jwt from "jsonwebtoken";
export declare function generateAccessToken(userId: string): string;
export declare function verifyToken(token: string): string | jwt.JwtPayload;
//# sourceMappingURL=jwt.utils.d.ts.map