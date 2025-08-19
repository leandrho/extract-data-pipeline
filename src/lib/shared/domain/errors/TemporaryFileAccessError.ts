import { DomainRuleViolationError } from "./DomainRuleViolationError";

export class TemporaryFileAccessError extends DomainRuleViolationError {
    constructor(filePath: string) {
        super(`Temporary file does not exist: ${filePath}`);
        this.name = 'TemporaryFileAccessError';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}