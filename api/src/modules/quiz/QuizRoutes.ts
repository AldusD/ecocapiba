import { Router } from "express";
import { QuizController } from "./QuizController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
import { authenticate } from "../../middleware/authenticate.js";

@Route("/quiz")
export class QuizRoutes {
    public router = Router();
    private QuizController = new QuizController();

    constructor () {
        this.router.post('/attempt/:quizId', authenticate, (req, res) => this.QuizController.registerAttempt(req, res));
    }
}