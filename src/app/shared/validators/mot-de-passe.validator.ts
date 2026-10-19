import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export interface MotDePasseValidatorError {
    nombre? : boolean,
    minuscule? : boolean,
    majuscule? : boolean,
    special? : boolean
}


export function MotDePasseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value as string | null;

        if (!value) return null;

        const errors: MotDePasseValidatorError = {};

        if (!/[0-9]/u.test(value)) errors.nombre = true;
        if (!/\p{Ll}/u.test(value)) errors.minuscule = true;
        if (!/\p{Lu}/u.test(value)) errors.majuscule = true;
        if (!/[\p{P}\p{S}]/u.test(value)) errors.special = true;

        return Object.keys(errors).length > 0 ? { mdpRobuste: errors } : null;
    }
}