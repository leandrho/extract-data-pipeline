import { Request, Response } from 'express';
import { ProcessDocumentDniUseCase } from '../../application/use-cases/ProcessDocumentDniUseCase';
import { ILogger } from '../../../shared/application/services/ILogger';

export class PipeController {

    constructor( private readonly processDocumentDniUC: ProcessDocumentDniUseCase, private readonly logger: ILogger ){}

    public async processDNI(req: Request, res: Response): Promise<void>{

            this.logger.info('PipeController::processDNI - Processing DNI document', { ip: req.ip, file: req.file });
            const file: any = req.file;
            const result = await this.processDocumentDniUC.execute(file.path );
            if (!result) {
                this.logger.warn('PipeController::processDNI - Received invalid imgPath for DNI processing', { file: req.body, ip: req.ip });
                res.status(404).json({ message: 'DNI data not found' });
                return;
            }
            res.status(200).json(result);
    }
    
}