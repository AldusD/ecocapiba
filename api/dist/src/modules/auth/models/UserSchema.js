import { UserRolerEnum } from "../../shared/enums/userRolesEnum.js";
export class UserSchema {
    id;
    email;
    password;
    role;
    xp;
    constructor(id, email, password, role = UserRolerEnum.COMMON, xp) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.xp = xp;
    }
    getId() { return this.id; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getRole() { return this.role; }
    getXp() { return this.xp; }
    setXp(xp) { this.xp = xp; }
}
//# sourceMappingURL=UserSchema.js.map