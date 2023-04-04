import { DynamicFormField } from "./dynamicFormField";

export type DynamicForm = {
    submitLabel: string;
    fields: DynamicFormField[];
}