import { DomainRuleViolationError } from "../errors/DomainRuleViolationError";

export class DniNamePart {
    private readonly namePart: string;
    constructor( value: string, propName: string ){
        const v: string = value.trim();
        if(!value || (value.length < 2 || value.length > 30)){
            throw new DomainRuleViolationError(`DniNamePart - ${propName} must be between 2 and 30 characters long.`);
        }
        this.namePart = v;
    }

    public value(): string{
        return this.namePart
    }

}

export class DniFirstName extends DniNamePart{
    constructor(value: string){
        super(value, 'firstName');
    }
} 

export class DniLastName extends DniNamePart{
    constructor(value: string){
        super(value, 'lastName');
    }
}