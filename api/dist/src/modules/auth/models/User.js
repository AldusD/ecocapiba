import { UserRolerEnum } from "../../shared/enums/userRolesEnum.js";
export class User {
    id;
    email; // TODO change to specific email class??
    password;
    role;
    xp;
    constructor(email, password, role = UserRolerEnum.COMMON, xp) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.xp = xp;
    }
    static ofDbUser(dbUser) {
        const user = new User(dbUser.getEmail(), dbUser.getPassword(), dbUser.getRole(), dbUser.getXp());
        user.setId(dbUser.getId());
        return user;
    }
    addXp(amount) {
        this.xp += amount;
        return this.xp;
    }
    getXp() {
        return this.xp;
    }
    checkBalance() {
        // implements logic with no link to prisma representation
        return 10;
    }
    setId(id) {
        this.id = id;
    }
    setXp(amount) {
        this.xp = amount;
        return this.xp;
    }
}
//# sourceMappingURL=User.js.map