export class XpSchema {
    id;
    userId;
    xp;
    constructor(id, userId, xp) {
        this.id = id;
        this.userId = userId;
        this.xp = xp;
    }
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getXp() { return this.xp; }
    setXp(xp) { this.xp = xp; }
}
//# sourceMappingURL=XpSchema.js.map