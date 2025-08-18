import { OcrService } from 'src/lib/shared/application/services/OcrService';
import { DataExtractService } from '../../domain/services/DataExtractService';
import { DocumentDniOutDto } from '../dtos/DocumentDniOutDto';


export class ProcessDocumentDniUseCase {

    constructor(
        private readonly dataExtractor: DataExtractService,
        private readonly ocrService: OcrService,
    ){}

    async execute(imgPath: string): Promise<DocumentDniOutDto | null> {

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