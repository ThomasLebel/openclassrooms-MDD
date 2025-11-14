import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value: string = control.value || '';

  const minLength = /.{8,}/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const valid = minLength && hasLower && hasUpper && hasNumber && hasSpecial;

  return valid ? null : { passwordStrength: true };
}
