import express, { type Application } from 'express';
import cors from "cors";
import { AppRoutes } from '../../src/resources/decorator/appRoutesDecorator.js';

// Import routes to register them
import '../../src/modules/auth/AuthRoutes.js';
import '../../src/modules/quiz/QuizRoutes.js';
import '../../src/modules/recycle/RecycleRoutes.js';

@AppRoutes
export class TestApp {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.get('/', (req: any, res: any) => {
      res.json({ message: 'Hello World' });
    });
  }
}

export function createTestApp(): Application {
  const testApp = new TestApp();
  return testApp.app;
}

