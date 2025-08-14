
export class DniNumber{
    private readonly dni: string;
    constructor(num: string){
        const v: string = num.trim();
        if(!v || (v.length !== 8 && v.length !== 9) || !isFinite(Number(v))){
            throw new Error('DniNumber - dni must be 8 or 9 digits long.');
        }
        this.dni = v;
    }
    public value(): string {
        return this.dni;
    }
}