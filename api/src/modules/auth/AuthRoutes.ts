import { Router } from "express";
import { AuthController } from "./AuthController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";

@Route("/auth")
export class AuthRoutes {
    public router: Router;
    private authController = new AuthController();

    constructor () {
        this.router = Router();
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.get("/getxp", (req, res) => this.authController.getXp(req, res));
        this.router.post("/addxp", (req, res) => this.authController.addxp(req, res));
    }
}