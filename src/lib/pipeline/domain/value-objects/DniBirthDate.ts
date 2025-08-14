
export class DniBirthDate {
    private readonly birthDate: Date;

    constructor(birthDate: Date){
        const now = new Date();
        if(!(birthDate instanceof Date) || isNaN(birthDate.getTime()) || (now.getTime() < birthDate.getTime())){
            throw new Error('DniBirthDate - Invalid date.');
        }
        this.birthDate = birthDate;
    }

    public value(): Date {
        return this.birthDate;
    }
}