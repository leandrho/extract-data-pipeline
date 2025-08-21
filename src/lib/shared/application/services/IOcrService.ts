
export interface IOcrService {
    extractTextFromImage(imgPath: string): Promise<string>
}