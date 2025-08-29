import { Request, Response } from 'express';
import { ProcessDocumentDniUseCase } from '../../application/use-cases/ProcessDocumentDniUseCase';
import { ILogger } from '../../../shared/application/services/ILogger';
import { inject, injectable } from 'inversify';
import { PIPE_TYPES } from '../../types';
import { SHARED_TYPES } from '../../../shared/types';

@injectable()
export class PipeController {

    constructor( @inject(PIPE_TYPES.ProcessDocumentDniUseCase) private readonly processDocumentDniUC: ProcessDocumentDniUseCase, @inject(SHARED_TYPES.Logger) private readonly logger: ILogger ){}

    public async processDNI(req: Request, res: Response): Promise<void>{

            this.logger.info('PipeController::processDNI - Processing DNI document', { ip: req.ip, file: req.file });
            const file = req.file;
            if (!file) {
                this.logger.warn('PipeController::processDNI - No file uploaded', { ip: req.ip });
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }
            const result = await this.processDocumentDniUC.execute(file.path );
            if (!result) {
                this.logger.warn('PipeController::processDNI - Could not extract DNI data from the provided image.', { file: file.originalname, ip: req.ip });
                res.status(404).json({ message: 'DNI data not found' });
                return;
            }
            res.status(200).json(result);
    }
    
}