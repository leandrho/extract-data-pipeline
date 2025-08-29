import "reflect-metadata";
import express, {Application} from "express";
import { json } from 'body-parser';
import { createErrorHandlerMiddleware } from './lib/shared/infrastructure/http/middlewares/errorHandlerMiddleware';
import { ILogger } from "./lib/shared/application/services/ILogger";
import envs from "./lib/config/envs";
import { PipeRouter } from './lib/pipeline/infrastructure/http/PipeRouter';
import { Container } from "inversify";
import { configurePipelineModule } from "./lib/pipeline/config/inversify.config";
import { configureSharedModule } from "./lib/shared/config/inversify.config";
import { SHARED_TYPES } from "./lib/shared/types";
import { PIPE_TYPES } from "./lib/pipeline/types";

const app: Application = express();
const container = new Container();
configureSharedModule(container);
configurePipelineModule(container);

const logger: ILogger = container.get<ILogger>(SHARED_TYPES.Logger);
const errorHandlerMiddleware = createErrorHandlerMiddleware(logger);

const pipeRouter = container.get<PipeRouter>(PIPE_TYPES.PipeRouter);

app.use(json());
app.use('/process-dni', pipeRouter.router);
app.use(errorHandlerMiddleware)

const port: number = envs.PORT || 3000;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`, { appName: envs.APP_NAME });
});