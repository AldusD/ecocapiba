import { Router } from "express";
import { RecycleController } from "./RecycleController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";

@Route("/recycle")
export class RecycleRoutes {
    public router = Router();
    private recycleController = new RecycleController();

    constructor () {
        this.router.post('/check-recycle',(req,res) => this.recycleController.checkRecycle(req,res));
        this.router.post('/', (req,res) => this.recycleController.create(req,res))
    }
}