import { ValidatorFn } from "@angular/forms";
import { HTMLInputAutocomplete, HTMLInputType } from "../html";

export class DynamicFormField {
    label: string;
    name: string;
    type: HTMLInputType;
    validators: ValidatorFn[] = [];
    autocomplete?: HTMLInputAutocomplete = 'off';

    constructor(label: string, name: string, type: HTMLInputType) {
        this.label = label;
        this.name = name;
        this.type = type;
        this.validators = [];
    }

    setAutocomplete(autocomplete: HTMLInputAutocomplete | undefined) {
        this.autocomplete = autocomplete;
    }

    setValidators(validators: ValidatorFn[]) {
        this.validators = validators;
    }

    addValidator(validator: ValidatorFn) {
        this.validators.push(validator);
    }
}