import { UserSchema } from "./models/UserSchema.js";
import { UserRolerEnum } from "../shared/enums/userRolesEnum.js";

export class AuthRepository {
    getByEmail (email: string) : UserSchema {
        return new UserSchema(1, 'aa@aa.com', 'senha', UserRolerEnum.COMMON, 200);
    } // TODO switch for actual query

    updateXp (email: string, newXp: number) : UserSchema {
        return new UserSchema(1, email, 'senha', UserRolerEnum.COMMON, newXp);
    } // TODO switch for actual query
}