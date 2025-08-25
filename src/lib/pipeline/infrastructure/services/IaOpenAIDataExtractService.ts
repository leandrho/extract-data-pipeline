import { ILogger } from "../../../shared/application/services/ILogger";
import { DataExtractService } from "../../domain/services/DataExtractService";
import { DocumentDni } from "../../domain/entities/DocumentDni";
import OpenAI from "openai";

export class IaOpenAIDataExtractService implements DataExtractService {
    private openai: OpenAI;
    constructor(private readonly logger: ILogger){
        this.openai = new OpenAI({
            apiKey: 'your-ai-api-key',
            baseURL: 'http://127.0.0.1:1234/v1',
        });
        this.logger.info('IaOpenAIDataExtractService initialized with Ollama model', { model: 'openai/gpt-oss-20b' });
    }

    public async extractDniDataFromDniOcr(text: string): Promise<DocumentDni | null> {
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
                model: 'openai/gpt-oss-20b',
                instructions: 'You are a helpful assistant that extracts DNI data from text.' ,
                input: prompt
                
            });

            const match = res.output_text.match(/\{[\s\S]*\}/);
            let obj: {numberId: string, firstName: string, lastName: string, birthDate: string} = {numberId: '', firstName: '', lastName: '', birthDate: ''};
            if (match) {
                obj = JSON.parse(match[0]);
            }

            const output = {
                numberId: obj.numberId,
                firstName: obj.firstName,
                lastName: obj.lastName,
                birthDate: obj.birthDate
            };
            this.logger.info('IaOpenAIDataExtractService::extractDniDataFromDniOcr - Data extracted from OpenAI', { output });
            if(!output.numberId || !output.firstName)
                return null;

            return DocumentDni.fromPrimitives({numberId: output.numberId, firstName: output.firstName, lastName: output.lastName, birthDate: new Date(output.birthDate)});
    }

}