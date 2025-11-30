import { Router } from "express";
import { StreakController } from "./StreakController.js";
import { Route } from "../../resources/decorator/routeDecorator.js"; // Ajuste o caminho

@Route("/streak")
export class StreakRoutes {
    public router = Router();
    private streakController = new StreakController();

    constructor () {
        this.router.get('/multiplier/:userId', (req, res) => this.streakController.getMultiplier(req, res));
    }
}