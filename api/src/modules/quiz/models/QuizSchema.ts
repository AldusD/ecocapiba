import type { QuestionTypesEnum } from "../../shared/enums/questionTypesEnum.js";
import type { Question } from "./Question.js";

export class QuizSchema {
    private id!: number;
    private type!: QuestionTypesEnum;
    private questions!: Question[];

    constructor(id: number, type: QuestionTypesEnum, questions: Question[]) {
        this.id = id;
        this.type = type;
        this.questions = questions;
    }

    getId (): number { return this.id }
    getType (): QuestionTypesEnum { return this.type }
    getQuestions (): Question[] { return this.questions }

    setId (id: number) { this.id = id; }
    setType (type: QuestionTypesEnum) { this.type = type; }
    setQuestions (questions: Question[]) { this.questions = questions; }
}