import { DniNumber, DniFirstName, DniLastName, DniBirthDate } from '../value-objects';

export class DocumentDNI {

    constructor(
        public readonly numberId: DniNumber,
        public readonly firstName: DniFirstName,
        public readonly lastName: DniLastName,
        public readonly birthDate: DniBirthDate
    ){}

    get fullName(): string{
        return `${this.firstName.value()} ${this.lastName.value()}`
    }

}