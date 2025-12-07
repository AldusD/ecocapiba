import { Router } from "express";
import { QuizController } from "./QuizController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";

@Route("/quiz")
export class QuizRoutes {
    public router: Router;
    private QuizController = new QuizController();

    constructor () {
        this.router = Router();
        this.router.post('/attempt/:quizId', (req, res) => this.QuizController.registerAttempt(req, res));
    }
}