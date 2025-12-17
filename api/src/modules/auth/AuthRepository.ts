import { PrismaClient, type User, type InvitationLog, Prisma } from "@prisma/client";

export type SafeUser = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    invitationCode: string;
    xp: number;
    capibas: number;
}

export class AuthRepository {
    private prisma = new PrismaClient();

    async getCapibasHistory(userId: number, limit = 20) {
        const [genericLogs, recycleLogs, quizLogs] = await Promise.all([
            this.prisma.rewardLog.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: limit,
                select: {
                    id: true,
                    capibas: true,
                    xp: true,
                    reason: true,
                    metadata: true,
                    createdAt: true,
                },
            }),
            this.prisma.recycleRewardLog.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: limit,
                select: {
                    id: true,
                    capibas: true,
                    xp: true,
                    metadata: true,
                    createdAt: true,
                    recyclesMadeId: true,
                    RecyclesMade: { select: { doneDate: true } },
                },
            }),
            this.prisma.quizAttemptRewardLog.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: limit,
                select: {
                    id: true,
                    capibas: true,
                    xp: true,
                    metadata: true,
                    createdAt: true,
                    quizAttemptId: true,
                    QuizAttempt: { select: { quizId: true, status: true } },
                },
            }),
        ]);

        const normalized = [
            ...genericLogs.map((log) => ({
                id: `reward:${log.id}`,
                type: "reward" as const,
                title: String(log.reason ?? "reward"),
                capibas: log.capibas,
                xp: log.xp,
                createdAt: log.createdAt,
                source: null as null,
                metadata: log.metadata ?? null,
            })),
            ...recycleLogs.map((log) => ({
                id: `recycle:${log.id}`,
                type: "recycle" as const,
                title: "Reciclagem",
                capibas: log.capibas,
                xp: log.xp,
                createdAt: log.createdAt,
                source: { recyclesMadeId: log.recyclesMadeId, doneDate: log.RecyclesMade?.doneDate ?? null },
                metadata: log.metadata ?? null,
            })),
            ...quizLogs.map((log) => ({
                id: `quiz:${log.id}`,
                type: "quiz" as const,
                title: "Quiz",
                capibas: log.capibas,
                xp: log.xp,
                createdAt: log.createdAt,
                source: { quizAttemptId: log.quizAttemptId, quizId: log.QuizAttempt?.quizId ?? null, status: log.QuizAttempt?.status ?? null },
                metadata: log.metadata ?? null,
            })),
        ];

        normalized.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return normalized.slice(0, limit);
    }

    async getByEmail (email: string) : Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email: email }
        })
    }

    async getByCPF (cpf: string) : Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { cpf: cpf }
        })
    }

    async getById(id: number): Promise<SafeUser | null> {
        return await this.prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                invitationCode: true,
                xp: true,
                capibas: true,
            },
            where: { id: id }
        });
    }

    async getByInvitationCode(invitationCode: string): Promise<SafeUser | null> {
        return await this.prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                invitationCode: true,
                xp: true,
                capibas: true,
            },
            where: { invitationCode: invitationCode }
        });
    }

    async create (
        email: string,
        password: string,
        cpf: string,
        name: string,
        invitationCode: string,
        xp: number,
        capibas: number,
    ) : Promise<User>  {
        return await this.prisma.user.create({
            data: {
                email: email,
                password: password,
                cpf: cpf,
                name: name,
                invitationCode: invitationCode,
            }
        })
    }

    async addReward(
        userId: number,
        xp: number,
        capibas: number,
        reason = "generic_reward",
        metadata?: Prisma.InputJsonValue | undefined
    ) : Promise<User> {
        const [user] = await this.prisma.$transaction([
            this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    xp: {increment: xp},
                    capibas: {increment: capibas}
                }
            }),
            this.prisma.rewardLog.create({
                data: {
                    userId: userId,
                    xp: xp,
                    capibas: capibas,
                    reason: reason,
                    ...(metadata !== undefined ? { metadata: metadata } : {})
                }
            })
        ]);

        return user;
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return await this.prisma.user.update({
        where: { id },
        data
        });
    }

    async delete(id: number): Promise<User> {
        return await this.prisma.user.delete({
        where: { id }
        });
    }

    async createInvitationLog(
        inviterId: number,
        invitedId: number,
        xp: number,
        capibas: number
    ): Promise<InvitationLog> {
        return await this.prisma.invitationLog.create({
            data: {
                inviterId: inviterId,
                invitedId: invitedId,
                capibas: capibas,
                xp: xp
            }
        })
    }
}
