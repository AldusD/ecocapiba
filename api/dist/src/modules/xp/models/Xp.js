import { XpSchema } from "./XpSchema.js";
export class Xp {
    id;
    userId;
    xp;
    constructor(userId, xp) {
        this.userId = userId;
        this.xp = xp;
    }
    static ofDbXp(dbXp) {
        const xpObject = new Xp(dbXp.getUserId(), dbXp.getXp());
        xpObject.setId(dbXp.getId());
        return xpObject;
    }
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getXp() { return this.xp; }
    setXp(xp) { this.xp = xp; }
    setId(id) { this.id = id; }
    addXp(amount) {
        this.xp += amount;
        return this.xp;
    }
}
//# sourceMappingURL=Xp.js.map