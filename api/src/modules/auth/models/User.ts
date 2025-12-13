import { UserRolerEnum } from "../../shared/enums/userRolesEnum.js";
import type { UserSchema } from "./UserSchema.js";

export class User { // user has behavior, knows more stuff, userSchema is about connecting to prisma TODO move that to readme
    private id?: number;
    private email!: string; // TODO change to specific email class??
    private password!: string;
    private role!: UserRolerEnum;
    private xp!: number;

    constructor(email: string, password: string, role: UserRolerEnum = UserRolerEnum.COMMON, xp: number) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.xp = xp;
    }

   static ofDbUser (dbUser: UserSchema): User {
        const user = new User(dbUser.getEmail(), dbUser.getPassword(), dbUser.getRole(), dbUser.getXp());
        user.setId(dbUser.getId());
        return user;
    }

    addXp (amount: number): number {
        this.xp += amount;
        return this.xp;
    }

    getXp (): number {
        return this.xp;
    }

    checkBalance () : number {
        // implements logic with no link to prisma representation
        return 10;
    }

    setId (id: number) {
        this.id = id;
    }

    setXp (amount: number) {
        this.xp = amount;
        return this.xp;
    }
}