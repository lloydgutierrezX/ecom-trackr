import { ValidatorFn, Validators } from "@angular/forms"
import { matchValidator } from "../validators/match.validator";

export const mapValidators = (validatorKeys: string[]): ValidatorFn[] => {
  return validatorKeys.map(key => {

    if (key.startsWith('match:')) {
      console.log(key);
      const fieldName = key.split(':')[1];
      console.log(fieldName);
      return matchValidator(fieldName);
    }

    else if (key === 'required') {
      return Validators.required;
    }

    else if (key === 'number') {
      return Validators.pattern(/^\d+$/);
    }

    else if (key === 'email') {
      return Validators.email;
    }

    else if (key === 'mobilePH') {
      return Validators.pattern(/^\+639\d{9}$/);
    }

    else if (key === 'password') {
      return Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
    }

    else if (key.startsWith('minLength')) {
      const v = getValidatorValue(key);
      return v === -1 ? Validators.nullValidator : Validators.minLength(Number(v));
    }

    else if (key.startsWith('maxLength')) {
      const v = getValidatorValue(key);
      return v === -1 ? Validators.nullValidator : Validators.maxLength(Number(v));
    }

    else if (key.startsWith('min')) {
      const v = getValidatorValue(key);
      return v === -1 ? Validators.nullValidator : Validators.min(Number(v));
    }

    else if (key.startsWith('max')) {
      const v = getValidatorValue(key);
      return v === -1 ? Validators.nullValidator : Validators.max(Number(v));
    }

    return Validators.nullValidator;
  });
}

const getValidatorValue = (validation: string): number => {
  const [k, v] = validation.split(':');

  if (!v || Number.isNaN(Number(v))) {
    return -1;
  }

  return Number(v);
}