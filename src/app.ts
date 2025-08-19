import express, {Application} from "express";
import { json } from 'body-parser';
import { createErrorHandlerMiddleware } from './lib/shared/infrastructure/http/middlewares/errorHandlerMiddleware';
import { WinstonLogger } from './lib/shared/infrastructure/logger/WinstonLogger';
import { ILogger } from "./lib/shared/application/services/ILogger";
import envs from "./lib/config/envs";
import { PipeRouter } from './lib/pipeline/infrastructure/http/PipeRouter';
import { PipeController } from "./lib/pipeline/infrastructure/http/PipeController";
import { ProcessDocumentDniUseCase } from "./lib/pipeline/application/use-cases/ProcessDocumentDniUseCase";
import { DataExtractService } from './lib/pipeline/domain/services/DataExtractService';
import { OcrService } from "./lib/shared/application/services/OcrService";

const app: Application = express();

const logger: ILogger = new WinstonLogger();
const errorHandlerMiddleware = createErrorHandlerMiddleware(logger);

app.use(json());
const dataExtractServiceInstance: any = null;;
const ocrService: any = null ;
const processDniUC: ProcessDocumentDniUseCase = new ProcessDocumentDniUseCase(dataExtractServiceInstance, ocrService, logger);
const pipeController: PipeController = new PipeController(processDniUC, logger);
const pipeRouter: PipeRouter = new PipeRouter(pipeController);
app.use('/process-dni', pipeRouter.router);
app.use(errorHandlerMiddleware)

const port: number = envs.PORT || 3000;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`, { appName: envs.APP_NAME });
});