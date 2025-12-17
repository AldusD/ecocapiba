import { Router } from "express";
import { AuthController } from "./AuthController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
import { authenticate } from "../../middleware/authenticate.js";

@Route("/auth")
export class AuthRoutes {
    public router = Router()
    private authController = new AuthController();

    constructor () {
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.post('/register', (req, res) => this.authController.register(req, res));
        this.router.get('/profile', authenticate, (req, res) => this.authController.profile(req, res));
        this.router.get("/getxp", authenticate, (req, res) => this.authController.getXp(req, res));
        this.router.get("/capibas-history", authenticate, (req, res) => this.authController.capibasHistory(req, res));
        this.router.post("/addxp", authenticate, (req, res) => this.authController.addXp(req, res));
    }
}
