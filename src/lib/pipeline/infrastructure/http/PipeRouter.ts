import { Router } from "express";
import { PipeController } from "./PipeController";
import { IFileUpload } from '../../../shared/application/interfaces/IFileUpload';

export class PipeRouter {
    
    private readonly _router: Router;

    constructor( private readonly fileUpload: IFileUpload, private readonly pipeController: PipeController ) {
        this._router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this._router.post('/single', this.fileUpload.single('file'), (req, res) => this.pipeController.processDNI(req, res));
        this._router.post('/multiple', this.fileUpload.multiple('file', 2), (req, res) => this.pipeController.processDNI(req, res));
    }

    public get router(): Router{
        return this._router;
    }

}