import { ILogger } from "../../../shared/application/services/ILogger";
import { DataExtractService } from "../../domain/services/DataExtractService";
import { DocumentDni } from "../../domain/entities/DocumentDni";
import envs from "../../../config/envs";
import OpenAI from "openai";
import { inject, injectable } from "inversify";
import { SHARED_TYPES } from "../../../shared/types";

@injectable()
export class IaOpenAIDataExtractService implements DataExtractService {
    private openai: OpenAI;
    constructor(@inject(SHARED_TYPES.Logger) private readonly logger: ILogger){
        this.openai = new OpenAI({
            apiKey: envs.OPENAI_API_KEY,
            baseURL: envs.OPENAI_BASE_URL,
        });
        this.logger.info('IaOpenAIDataExtractService initialized', { model: 'gemma-3-4b-it', baseURL: this.openai.baseURL });
    }

    public async extractDniDataFromDniOcr(text: string): Promise<DocumentDni | null> {

        try {
            const prompt = `
                            Clean(remove all special characters) and extract the DNI number, first name, last name, and birth date from the following text.

                            ⚠️ Output rules:
                            - Return only valid JSON.
                            - Do not include explanations or any extra text.
                            - Wrap the result inside a Markdown JSON block.
                            - Number ID(Document) includes dots, remove them. its length is between 8 and 9 digits, and can't start with 0.

                            The output must follow this structure:
                            \`\`\`json
                            {
                            "numberId": "DNI number",
                            "firstName": "First name",
                            "lastName": "Last name",
                            "birthDate": "YYYY-MM-DD"
                            }
                            \`\`\`

                            Text to extract from:
                            ${text}`;

            const res = await this.openai.responses.create({
                model: 'gemma-3-4b-it',
                instructions: 'You are a helpful assistant that extracts DNI data from text.' ,
                input: prompt
                
            });

            // Regex to find a JSON object inside markdown code fences
            const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
            const match = res.output_text.match(jsonRegex);

            if (!match || !match[1]) {
                this.logger.warn('IaOpenAIDataExtractService::extractDniDataFromDniOcr - No JSON block found in AI response', { response: res.output_text });
                return null;
            }

            const jsonObj = JSON.parse(match[1]);

            // Basic validation of the parsed object
            if (typeof jsonObj.numberId !== 'string' || typeof jsonObj.firstName !== 'string' || typeof jsonObj.lastName !== 'string' || typeof jsonObj.birthDate !== 'string') {
                this.logger.warn('IaOpenAIDataExtractService::extractDniDataFromDniOcr - Parsed JSON has incorrect structure', { jsonObj });
                return null;
            }

            const output = jsonObj as {numberId: string, firstName: string, lastName: string, birthDate: string};

            this.logger.info('IaOpenAIDataExtractService::extractDniDataFromDniOcr - Data extracted from OpenAI', { output });
            if(!output.numberId || !output.firstName) {
                this.logger.warn('IaOpenAIDataExtractService::extractDniDataFromDniOcr - Extracted data is missing required fields', { output });
                return null;
            }

            return DocumentDni.fromPrimitives({numberId: output.numberId, firstName: output.firstName, lastName: output.lastName, birthDate: new Date(output.birthDate)});
        } catch (error) {
            this.logger.error('IaOpenAIDataExtractService::extractDniDataFromDniOcr - Failed to extract or process DNI data', error as Error, { text });
            return null;
        }
    }

}