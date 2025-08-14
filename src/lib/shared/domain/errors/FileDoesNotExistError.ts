
export class FileDoesNotExistError extends Error {
    constructor(filePath: string) {
        super(`File does not exist: ${filePath}`);
        this.name = 'FileDoesNotExistError';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}