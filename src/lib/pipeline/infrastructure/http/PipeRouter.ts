import { Router } from "express";
import { PipeController } from "./PipeController";

export class PipeRouter {
    public readonly router: Router;
    constructor( private readonly pipeController: PipeController ) {
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post('/', (req, res) => this.pipeController.processDNI(req, res));
    }

}