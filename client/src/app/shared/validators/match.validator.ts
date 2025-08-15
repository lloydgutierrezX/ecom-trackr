import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchValidator = (matchTo: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    const matchControl = control.parent.get(matchTo);
    return matchTo && control.value !== matchControl?.value ?
      { mismatch: { message: `Must match ${matchTo}` } } :
      null;
  };
}