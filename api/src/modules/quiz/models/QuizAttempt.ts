import type { QuizAttemptStatusEnum } from "../../shared/enums/quizAttemptStatusEnum.js";
import type { QuizAttemptSchema } from "./QuizAttemptSchema.js";

export class QuizAttempt {
    private id?: number;
    private quizId!: number;
    private userId!: number;
    private createdAt!: Date;
    private status!: QuizAttemptStatusEnum;

    constructor(quizId: number, userId: number, status: QuizAttemptStatusEnum, createdAt: Date = new Date()) {
        this.quizId = quizId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.status = status;
    }

   static ofDbQuestionAttempt (dbQuizAttempt: QuizAttemptSchema): QuizAttempt {
        const quizAttempt =  new QuizAttempt(dbQuizAttempt.getQuizId(), dbQuizAttempt.getUserId(), dbQuizAttempt.getStatus(), dbQuizAttempt.getCreatedAt());
        quizAttempt.setId(dbQuizAttempt.getId()); 
        return quizAttempt;
    }

    getId (): number | undefined { return this.id }
    getUserId (): number { return this.userId }
    getQuizId (): number { return this.quizId }
    getCreatedAt (): Date { return this.createdAt }
    getStatus (): QuizAttemptStatusEnum { return this.status }

    setId (id: number) { this.id = id; }
    setQuizId (quizId: number) { this.quizId = quizId; }
    setUserId (userId: number) { this.userId = userId; }
    setCreatedAt (createdAt: Date) { this.createdAt = createdAt; }
    setStatus (status: QuizAttemptStatusEnum) { this.status = status; }
}