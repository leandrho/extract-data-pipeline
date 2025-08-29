import { Container } from "inversify";
import { IFileUpload } from "../application/interfaces/IFileUpload";
import { SHARED_TYPES } from "../types";
import { FileUploadMulter } from "../infrastructure/middleware/FileUploadMulter";
import { ILogger } from "../application/services/ILogger";
import { WinstonLogger } from "../infrastructure/services/WinstonLogger";
import { IOcrService } from "../application/services/IOcrService";
import { OcrTesseractService } from "../infrastructure/services/OcrTesseractService";

export function configureSharedModule(container: Container){

    container.bind<IFileUpload>(SHARED_TYPES.FileUpload).to(FileUploadMulter).inSingletonScope();
    container.bind<ILogger>(SHARED_TYPES.Logger).to(WinstonLogger).inSingletonScope();
    container.bind<IOcrService>(SHARED_TYPES.OcrService).to(OcrTesseractService).inSingletonScope()

}