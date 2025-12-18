export class QuizAttemptSchema {
    private id!: number;
    private quizId!: number;
    private userId!: number;
    private createdAt!: Date;
    private status!: number;

    constructor(id: number, quizId: number, userId: number, status: number, createdAt: Date) {
        this.id = id;
        this.quizId = quizId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.status = status;
    }

    getId (): number { return this.id }
    getUserId (): number { return this.userId }
    getQuizId (): number { return this.quizId }
    getCreatedAt (): Date { return this.createdAt }
    getStatus (): number { return this.status }

    setId (id: number) { this.id = id; }
    setQuizId (quizId: number) { this.quizId = quizId; }
    setUserId (userId: number) { this.userId = userId; }
    setCreatedAt (createdAt: Date) { this.createdAt = createdAt; }
    setStatus (status: number) { this.status = status; }
}