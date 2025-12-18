import { Router } from "express";
import { EmployeeController } from "./EmployeeController.js";
import { EmployeeQRController } from "./EmployeeQRController.js";
import { Route } from "../../resources/decorator/routeDecorator.js";
import { authenticate } from "../../middleware/authenticate.js";

@Route("/employee")
export class EmployeeRoutes {
    public router = Router();
    private employeeController = new EmployeeController();
    private qrController = new EmployeeQRController();

    constructor() {
        this.router.post("/login", (req, res) => this.employeeController.login(req, res));
        this.router.post("/register", (req, res) => this.employeeController.register(req, res));
        this.router.get("/profile", authenticate, (req, res) => this.employeeController.profile(req, res));
        this.router.post("/qrcode", authenticate, (req, res) => this.qrController.createQRCode(req, res));
        this.router.get("/qrcode/history", authenticate, (req, res) => this.qrController.getQRHistory(req, res));
    }
}

