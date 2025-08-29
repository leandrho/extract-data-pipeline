import { Container } from "inversify";
import { PIPE_TYPES } from "../types";
import { DataExtractService } from "../domain/services/DataExtractService";
import { IaOpenAIDataExtractService } from "../infrastructure/services/IaOpenAIDataExtractService";
import { ProcessDocumentDniUseCase } from "../application/use-cases/ProcessDocumentDniUseCase";
import { PipeController } from "../infrastructure/http/PipeController";
import { PipeRouter } from "../infrastructure/http/PipeRouter";

export function configurePipelineModule(container: Container){
    container.bind<DataExtractService>(PIPE_TYPES.DataExtractService).to(IaOpenAIDataExtractService).inSingletonScope();
    container.bind<ProcessDocumentDniUseCase>(PIPE_TYPES.ProcessDocumentDniUseCase).to(ProcessDocumentDniUseCase).inSingletonScope();
    container.bind<PipeController>(PIPE_TYPES.PipeController).to(PipeController).inSingletonScope();
    container.bind<PipeRouter>(PIPE_TYPES.PipeRouter).to(PipeRouter).inSingletonScope();

}