export class Email {

    private readonly validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(
        private _value: string
    ) {
        this.ensureIsValid(_value)
    }

    get value(): string {
        return this._value;
    }

    public isEqual(email: Email): boolean {
        return this._value === email.value;
    }

    private ensureIsValid(value: string): void {
        if (!this.validEmailRegex.test(value)) throw new Error('Email');
    }
}