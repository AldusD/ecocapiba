import { UserRolerEnum } from "../../shared/enums/userRolesEnum.js";
import type { QuestionSchema } from "./QuestionSchema.js";

export class Question {
    private id?: number;
    private quizId!: number;
    private title!: string;
    private alternatives!: string[];
    private static correctAlternativeIndex = 0;

    constructor(quizId: number, title: string, alternatives: string[]) {
        this.quizId = quizId;
        this.title = title;
        this.alternatives = alternatives;
    }

   static ofDbQuestion (dbQuestion: QuestionSchema): Question {
        const question =  new Question(dbQuestion.getQuizId(), dbQuestion.getTitle(), dbQuestion.getAlternatives())
        question.setId(dbQuestion.getId()); 
        return question;
    }

    getId (): number | undefined { return this.id }
    getQuizId (): number { return this.quizId }
    getTitle (): string { return this.title }
    getAlternatives (): string[] { return this.alternatives }
    getCorrectAlternative (): string | undefined { return this.alternatives[Question.correctAlternativeIndex] }

    setId (id: number) { this.id = id; }
    setQuizId (quizId: number) { this.quizId = quizId; }
    setTitle (title: string) { this.title = title; }
    setAlternive (alternatives: string[]) { this.alternatives = alternatives; }
}