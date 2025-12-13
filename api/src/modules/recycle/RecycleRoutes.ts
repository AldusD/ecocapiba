import { Router } from "express";
import { RecycleController } from "./RecycleController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
import { authenticate } from "../../middleware/authenticate.js";

@Route("/recycle")
export class RecycleRoutes {
    public router = Router()
    private recycleController = new RecycleController();

    constructor () {
        this.router.post('/', (req,res) => this.recycleController.create(req,res));
        this.router.post('/calendar', authenticate, (req,res) => this.recycleController.getCalendar(req,res));
        this.router.get('/streak', authenticate, (req, res) => this.recycleController.getStreak(req, res));
    }
}