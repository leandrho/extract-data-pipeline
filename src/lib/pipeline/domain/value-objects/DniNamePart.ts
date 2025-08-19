import { InvalidPropertyError } from "../../../shared/domain/errors/InvalidPropertyError";

export class DniNamePart {
    private readonly namePart: string;
    constructor( value: string, propName: string ){
        const v: string = value.trim();
        if(!v || (v.length < 2 || v.length > 30)){
            throw new InvalidPropertyError(`DniNamePart - ${propName} must be between 2 and 30 characters long.`, propName, this.value);
        }
        this.namePart = v;
    }

    public value(): string{
        return this.namePart
    }
    // Just for debugging purposes
    public toString(): string{
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