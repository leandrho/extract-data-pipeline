import { InvalidPropertyError } from "../../../shared/domain/errors/InvalidPropertyError";

export class DniNumber{
    private readonly dni: string;
    constructor(num: string){
        const v: string = num.trim();
        if(!v || (v.length !== 8 && v.length !== 9) || !isFinite(Number(v))){
            throw new InvalidPropertyError('DniNumber - dni must be 8 or 9 digits long..', 'DniNumber', this.value);
        }
        this.dni = v;
    }
    public value(): string {
        return this.dni;
    }
}