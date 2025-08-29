import { Router } from "express";
import { PipeController } from "./PipeController";
import { IFileUpload } from '../../../shared/application/interfaces/IFileUpload';
import { inject, injectable } from "inversify";

import { SHARED_TYPES } from "../../../shared/types";
import { PIPE_TYPES } from "../../types";

@injectable()
export class PipeRouter {
    
    private readonly _router: Router;

    constructor( @inject(SHARED_TYPES.FileUpload) private readonly fileUpload: IFileUpload, @inject(PIPE_TYPES.PipeController) private readonly pipeController: PipeController ) {
        this._router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this._router.post('/single', this.fileUpload.single('file'), (req, res) => this.pipeController.processDNI(req, res));
        // TODO: El endpoint 'multiple' requiere un método de controlador dedicado para manejar `req.files` (un array de archivos).
        // this._router.post('/multiple', this.fileUpload.multiple('file', 2), (req, res) => this.pipeController.processDNI(req, res));
    }

    public get router(): Router{
        return this._router;
    }

}