import { UserRolerEnum } from "../../shared/enums/userRolesEnum.js";

export class QuestionSchema {
    private id!: number;
    private quizId!: number;
    private title!: string;
    private alternatives!: string[];

    constructor(id: number, quizId: number, title: string, alternatives: string[]) {
        this.quizId = quizId;
        this.title = title;
        this.alternatives = alternatives;
    }

    getId (): number { return this.id }
    getQuizId (): number { return this.quizId }
    getTitle (): string { return this.title }
    getAlternatives (): string[] { return this.alternatives }

    setId (id: number) { this.id = id; }
    setQuizId (quizId: number) { this.quizId = quizId; }
    setTitle (title: string) { this.title = title; }
    setAlternive (alternatives: string[]) { this.alternatives = alternatives; }
}