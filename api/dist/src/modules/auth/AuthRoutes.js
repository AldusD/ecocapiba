var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Router } from "express";
import { AuthController } from "./AuthController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
let AuthRoutes = class AuthRoutes {
    router = Router();
    authController = new AuthController();
    constructor() {
        this.router.post('/login', (req, res) => this.authController.login(req, res));
        this.router.post('/register', (req, res) => this.authController.register(req, res));
    }
};
AuthRoutes = __decorate([
    Route("/auth")
], AuthRoutes);
export { AuthRoutes };
//# sourceMappingURL=AuthRoutes.js.map