var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Router } from "express";
import { XpController } from "./XpController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
let XpRoutes = class XpRoutes {
    router;
    xpController = new XpController();
    constructor() {
        this.router = Router();
        this.router.get("/", (req, res) => this.xpController.getXp(req, res));
        this.router.post("/add", (req, res) => this.xpController.addXp(req, res));
    }
};
XpRoutes = __decorate([
    Route("/xp")
], XpRoutes);
export { XpRoutes };
//# sourceMappingURL=XpRoutes.js.map