import express, {Application} from "express";
import { json } from 'body-parser';
import { createErrorHandlerMiddleware } from './lib/shared/infrastructure/http/middlewares/errorHandlerMiddleware';
import { WinstonLogger } from './lib/shared/infrastructure/services/WinstonLogger';
import { ILogger } from "./lib/shared/application/services/ILogger";
import envs from "./lib/config/envs";
import { PipeRouter } from './lib/pipeline/infrastructure/http/PipeRouter';
import { PipeController } from "./lib/pipeline/infrastructure/http/PipeController";
import { ProcessDocumentDniUseCase } from "./lib/pipeline/application/use-cases/ProcessDocumentDniUseCase";
import { DataExtractService } from './lib/pipeline/domain/services/DataExtractService';
import { IOcrService } from "./lib/shared/application/services/IOcrService";
import { IFileUpload } from "./lib/shared/application/interfaces/IFileUpload";
import { FileUploadMulter } from "./lib/shared/infrastructure/middleware/FileUploadMulter";
import { OcrTesseractService } from "./lib/shared/infrastructure/services/OcrTesseractService";
import { IaOpenAIDataExtractService } from "./lib/pipeline/infrastructure/services/IaOpenAIDataExtractService";

const app: Application = express();

const logger: ILogger = new WinstonLogger();
const errorHandlerMiddleware = createErrorHandlerMiddleware(logger);

app.use(json());
const dataExtractServiceInstance: DataExtractService = new IaOpenAIDataExtractService(logger);;
const ocrService: IOcrService = new OcrTesseractService(logger); ;
const processDniUC: ProcessDocumentDniUseCase = new ProcessDocumentDniUseCase(dataExtractServiceInstance, ocrService, logger);
const fileUpload: IFileUpload = new FileUploadMulter('tmp/',logger);
const pipeController: PipeController = new PipeController(processDniUC, logger);
const pipeRouter: PipeRouter = new PipeRouter(fileUpload, pipeController);
app.use('/process-dni', pipeRouter.router);
app.use(errorHandlerMiddleware)

const port: number = envs.PORT || 3000;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`, { appName: envs.APP_NAME });
});