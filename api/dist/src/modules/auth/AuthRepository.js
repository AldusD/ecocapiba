import { UserSchema } from "./models/UserSchema.js";
import { UserRolerEnum } from "../shared/enums/userRolesEnum.js";
// In-memory storage for mock data (replace with actual database later)
let userXpStorage = {
    'aa@aa.com': 0
};
export class AuthRepository {
    getByEmail(email) {
        const xp = userXpStorage[email] || 0;
        return new UserSchema(1, email, 'senha', UserRolerEnum.COMMON, xp);
    } // TODO switch for actual query
    updateXp(email, newXp) {
        userXpStorage[email] = newXp;
        return new UserSchema(1, email, 'senha', UserRolerEnum.COMMON, newXp);
    } // TODO switch for actual query
}
//# sourceMappingURL=AuthRepository.js.map