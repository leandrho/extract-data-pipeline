
export interface OcrService {
    extractTextFromImage(imgPath: string): Promise<string>
}