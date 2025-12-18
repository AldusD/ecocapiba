import type { QuestionTypesEnum } from "../../shared/enums/questionTypesEnum.js";
import type { Question } from "./Question.js";
import type { QuizSchema } from "./QuizSchema.js";

export class Quiz {
    private id?: number;
    private type!: QuestionTypesEnum;
    private questions!: Question[];

    constructor(type: QuestionTypesEnum, questions: Question[]) {
        this.type = type;
        this.questions = questions;
    }

   static ofDbQuiz (dbQuiz: QuizSchema): Quiz {
        const quiz =  new Quiz(dbQuiz.getType(), dbQuiz.getQuestions())
        quiz.setId(dbQuiz.getId());
        return quiz;
    }

    getId (): number | undefined { return this.id }
    getType (): QuestionTypesEnum { return this.type }
    getQuestions (): Question[] { return this.questions }

    setId (id: number) { this.id = id; }
    setType (type: QuestionTypesEnum) { this.type = type; }
    setQuestions (questions: Question[]) { this.questions = questions; }
}