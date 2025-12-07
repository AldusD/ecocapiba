import { AuthRepository } from "./AuthRepository.js";
import { User } from "./models/User.js";
export class AuthService {
    authRepository = new AuthRepository();
    authUser(email, password) {
        const dbUser = this.authRepository.getByEmail(email);
        const user = User.ofDbUser(dbUser);
        // evaluate password and create jwt with userData
        const token = 'jwt';
        return token;
    }
    getXpByEmail(email) {
        const dbUser = this.authRepository.getByEmail(email);
        return User.ofDbUser(dbUser);
    }
    updateXp(email, newXp) {
        const dbUser = this.authRepository.updateXp(email, newXp);
        return User.ofDbUser(dbUser);
    }
}
//# sourceMappingURL=AuthService.js.map