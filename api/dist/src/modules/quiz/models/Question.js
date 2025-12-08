export class Question {
    id;
    quizId;
    title;
    alternatives;
    static correctAlternativeIndex = 0;
    constructor(quizId, title, alternatives) {
        this.quizId = quizId;
        this.title = title;
        this.alternatives = alternatives;
    }
    static ofDbQuestion(dbQuestion) {
        const question = new Question(dbQuestion.getQuizId(), dbQuestion.getTitle(), dbQuestion.getAlternatives());
        question.setId(dbQuestion.getId());
        return question;
    }
    getId() { return this.id; }
    getQuizId() { return this.quizId; }
    getTitle() { return this.title; }
    getAlternatives() { return this.alternatives; }
    getCorrectAlternative() { return this.alternatives[Question.correctAlternativeIndex]; }
    setId(id) { this.id = id; }
    setQuizId(quizId) { this.quizId = quizId; }
    setTitle(title) { this.title = title; }
    setAlternive(alternatives) { this.alternatives = alternatives; }
}
//# sourceMappingURL=Question.js.map