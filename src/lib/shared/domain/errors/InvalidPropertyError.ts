import { DomainRuleViolationError } from "./DomainRuleViolationError";

export class InvalidPropertyError extends DomainRuleViolationError {
    public readonly propName: string;
    public readonly propValue: any;

    constructor(message: string = 'Invalid input provided.', propName?: string, propValue?: any) {
        super(message);
        this.name = 'InvalidInputError';
        this.propName = propName || ''
        this.propValue = propValue;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }

}