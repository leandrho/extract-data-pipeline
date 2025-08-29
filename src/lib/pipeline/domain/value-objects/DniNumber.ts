import { InvalidPropertyError } from "../../../shared/domain/errors/InvalidPropertyError";

export class DniNumber{
    private readonly dni: string;
    constructor(num: string){
        const v: string = num.trim();
        // Nota: La definición del problema menciona 7 u 8 dígitos, pero la implementación permite 8 o 9. Esto debería ser consistente.
        if(!v || (v.length < 7 || v.length > 8) || !isFinite(Number(v))){
            throw new InvalidPropertyError('DniNumber - DNI debe tener entre 7 y 8 dígitos.', 'DniNumber', num);
        }
        this.dni = v;
    }
    public value(): string {
        return this.dni;
    }
}