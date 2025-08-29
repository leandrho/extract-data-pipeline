import { IOcrService } from '../../../shared/application/services/IOcrService';
import { DataExtractService } from '../../domain/services/DataExtractService';
import { DocumentDniOutDto } from '../dtos/DocumentDniOutDto';
import { ILogger } from '../../../shared/application/services/ILogger';
import { inject, injectable } from 'inversify';
import { PIPE_TYPES } from '../../types';
import { SHARED_TYPES } from "../../../shared/types"

@injectable()
export class ProcessDocumentDniUseCase {

    constructor(
        @inject(PIPE_TYPES.DataExtractService) private readonly dataExtractor: DataExtractService,
        @inject(SHARED_TYPES.OcrService) private readonly ocrService: IOcrService,
        @inject(SHARED_TYPES.Logger) private readonly logger: ILogger
    ){}

    async execute(imgPath: string): Promise<DocumentDniOutDto | null> {

        this.logger.info('ProcessDocumentDniUseCase::execute - Starting DNI document processing', { imgPath });
        const text = await this.ocrService.extractTextFromImage(imgPath);
        
        const documentDni = await this.dataExtractor.extractDniDataFromDniOcr(text);
        if(!documentDni) return null;

        return {
            number: documentDni.numberId.value(),
            firstName: documentDni.firstName.value(),
            lastName: documentDni.lastName.value(),
            birthDate: documentDni.birthDate.value()
        }
    }

}