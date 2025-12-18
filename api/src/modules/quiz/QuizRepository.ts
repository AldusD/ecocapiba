import PrismaService from "../../db/PrismaService.js";
import { QuizAttempt } from "./models/QuizAttempt.js";

export class QuizRepository {
    private static dbClient = PrismaService.getClient();

    public async getLastAttempt (userId: number) : Promise<QuizAttempt | undefined> {
        const attempt = await QuizRepository.dbClient.quizAttempt.findFirst({
            where: { userId }
        });

        if (!attempt) return undefined;

        const quizAttempt = new QuizAttempt(attempt.quizId, attempt.userId, attempt.status, attempt.createdAt);
        if (attempt.id) quizAttempt.setId(attempt.id);
        return quizAttempt;
    }

    public async saveAttempt (quizAttemptData: QuizAttempt) : Promise<QuizAttempt | undefined> {
        const created = await QuizRepository.dbClient.quizAttempt.create({
            data: {
                userId: quizAttemptData.getUserId(),
                quizId: quizAttemptData.getQuizId(),
                status: quizAttemptData.getStatus(),
            }
        });

        const quizAttempt = new QuizAttempt(created.quizId, created.userId, created.status, created.createdAt);
        if (created.id) quizAttempt.setId(created.id);
        return quizAttempt;
    }
}