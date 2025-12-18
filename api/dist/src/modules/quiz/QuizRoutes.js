var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Router } from "express";
import { QuizController } from "./QuizController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
import { authenticate } from "../../middleware/authenticate.js";
let QuizRoutes = class QuizRoutes {
    router = Router();
    QuizController = new QuizController();
    constructor() {
        this.router.post('/attempt/:quizId', authenticate, (req, res) => this.QuizController.registerAttempt(req, res));
    }
};
QuizRoutes = __decorate([
    Route("/quiz")
], QuizRoutes);
export { QuizRoutes };
//# sourceMappingURL=QuizRoutes.js.map