export class QuestionSchema {
    id;
    quizId;
    title;
    alternatives;
    constructor(id, quizId, title, alternatives) {
        this.quizId = quizId;
        this.title = title;
        this.alternatives = alternatives;
    }
    getId() { return this.id; }
    getQuizId() { return this.quizId; }
    getTitle() { return this.title; }
    getAlternatives() { return this.alternatives; }
    setId(id) { this.id = id; }
    setQuizId(quizId) { this.quizId = quizId; }
    setTitle(title) { this.title = title; }
    setAlternive(alternatives) { this.alternatives = alternatives; }
}
//# sourceMappingURL=QuestionSchema.js.map