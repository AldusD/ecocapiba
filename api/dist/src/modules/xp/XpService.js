import { XpRepository } from "./XpRepository.js";
import { Xp } from "./models/Xp.js";
export class XpService {
    xpRepository;
    constructor() {
        this.xpRepository = new XpRepository();
    }
    getXpByUserId(userId) {
        const dbXpSchema = this.xpRepository.getByUserId(userId);
        return Xp.ofDbXp(dbXpSchema);
    }
    updateXp(userId, newXp) {
        const dbXpSchema = this.xpRepository.updateXp(userId, newXp);
        return Xp.ofDbXp(dbXpSchema);
    }
}
//# sourceMappingURL=XpService.js.map