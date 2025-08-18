import { DniNumber, DniFirstName, DniLastName, DniBirthDate } from '../value-objects';

export class DocumentDni {

    constructor(
        public readonly numberId: DniNumber,
        public readonly firstName: DniFirstName,
        public readonly lastName: DniLastName,
        public readonly birthDate: DniBirthDate
    ){}

    public get fullName(): string{
        return `${this.firstName.value()} ${this.lastName.value()}`
    }

    public static fromPrimitives(data: {numberId: string, firstName: string, lastName: string, birthDate: Date}): DocumentDni{
        return new DocumentDni(
            new DniNumber(data.numberId),
            new DniFirstName(data.firstName),
            new DniLastName(data.lastName),
            new DniBirthDate(data.birthDate)
        );
    }

}