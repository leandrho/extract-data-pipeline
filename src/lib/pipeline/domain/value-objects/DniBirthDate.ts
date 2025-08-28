import { InvalidPropertyError } from "../../../shared/domain/errors/InvalidPropertyError";

export class DniBirthDate {
    private readonly birthDate: Date;

    constructor(birthDate: Date){
        const now = new Date();
        if(!(birthDate instanceof Date) || isNaN(birthDate.getTime()) || (now.getTime() < birthDate.getTime())){
            throw new InvalidPropertyError('DniBirthDate - Invalid date.', 'DniBirthDate', birthDate);
        }
        this.birthDate = birthDate;
    }

    public value(): Date {
        return this.birthDate;
    }
}