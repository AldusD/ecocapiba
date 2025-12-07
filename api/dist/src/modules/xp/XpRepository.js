import { XpSchema } from "./models/XpSchema.js";
export class XpRepository {
    getByUserId(userId) {
        // TODO: Replace with actual Prisma query
        // const user = await prisma.user.findUnique({
        //   where: { id: userId },
        //   select: { xp: true }
        // });
        // return new XpSchema(userId, userId, user.xp);
        return new XpSchema(1, userId, 100); // Mock data
    }
    updateXp(userId, newXp) {
        // TODO: Replace with actual Prisma query
        // const user = await prisma.user.update({
        //   where: { id: userId },
        //   data: { xp: newXp }
        // });
        // return new XpSchema(user.id, user.id, user.xp);
        return new XpSchema(userId, userId, newXp); // Mock data
    }
}
//# sourceMappingURL=XpRepository.js.map