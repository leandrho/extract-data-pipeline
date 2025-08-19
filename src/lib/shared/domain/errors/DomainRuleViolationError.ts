

export class DomainRuleViolationError extends Error{
    constructor(message: string = 'Domain rule violation.'){
        super(message);
        this.name = 'DomainRuleViolationError';
    }
}