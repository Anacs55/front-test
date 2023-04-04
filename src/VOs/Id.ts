import { customAlphabet } from 'nanoid';

export class Id {

    private static readonly TOTAL_LENGHT = 24;
    private static readonly TIMESTAMP_LENGHT = 6;
    private static readonly RANDOM_SIZE = this.TOTAL_LENGHT - this.TIMESTAMP_LENGHT;
    private static readonly TIMESTAMP_BASE = 36;
    private static readonly VALID_CHARS = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    private static readonly generator = customAlphabet(Id.VALID_CHARS);
    private static readonly VALID_CHARS_REGEX = new RegExp(`^[0-9a-zA-Z]{${this.TOTAL_LENGHT}}$`);

    constructor(
        private _value: string
    ) {
        this.ensureIsValid(_value);
    }

    private static generateParts(): {timestamp: string, random: string} {
        //TODO move to another class
        const timestamp = (~~(new Date().getTime() / 1000)).toString(this.TIMESTAMP_BASE);
        const random = this.generator(this.RANDOM_SIZE);
        return {
            timestamp,
            random,
        }
    }

    static generate(): Id {
        const {timestamp, random} = this.generateParts();
        return new Id(timestamp + random);
    }

    get value(): string {
        return this._value;
    }

    // Get the timestamp in unix seconds from the id
    public getTimePart(): string {
        return this.value.substring(0, Id.TIMESTAMP_LENGHT);
    }

    // Get the timestamp in unix seconds from the id
    public getTimestamp(): number {
        const timestamp = parseInt(this.getTimePart(), Id.TIMESTAMP_BASE);
        if (Number.isNaN(timestamp)) throw new Error("Invalid timestamp");
        return timestamp
    }

    // Get the random part of the id
    public getRandom(): string {
        return this.value.substring(Id.TIMESTAMP_LENGHT, Id.TOTAL_LENGHT);
    }

    public isEqual(id: Id): boolean {
        return this._value === id.value;
    }

    private ensureIsValid(value: string) {
        if (value === undefined) throw new Error('Invalid data: undefined Id');
        if (!Id.VALID_CHARS_REGEX.test(value)) throw new Error(value);
        this.getTimestamp();
    }
}