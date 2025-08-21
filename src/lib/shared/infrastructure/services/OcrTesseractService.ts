import Tesseract,{WorkerOptions} from 'tesseract.js';
import { IOcrService } from "../../application/services/IOcrService";
import { ILogger } from '../../application/services/ILogger';


export class OcrTesseractService implements IOcrService {

    constructor(private readonly logger: ILogger, private readonly lng: string = 'spa') {}

    async extractTextFromImage(imgPath: string): Promise<string> {
       const { data: { text } } = await Tesseract.recognize(
            imgPath,
            this.lng, // Language: Spanish
            {
                tessedit_pageseg_mode: Tesseract.PSM.AUTO, 
                tessedit_ocr_engine_mode: 1,
                user_defined_dpi: 300
            } as any
        );
        this.logger.info('OcrTesseractService::extractTextFromImage - OCR processing completed', { imgPath, lng: this.lng, text: text });
        return text;
    }

}
