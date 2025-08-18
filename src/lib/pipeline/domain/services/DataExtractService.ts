import { DocumentDni } from "../entities/DocumentDni";

export interface DataExtractService {
    extractDniDataFromDniOcr(text: string): Promise<DocumentDni | null>;
}