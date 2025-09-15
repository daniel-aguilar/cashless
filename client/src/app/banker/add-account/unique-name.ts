import { AbstractControl, ValidatorFn } from '@angular/forms';

export function uniqueName(existingNames: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    const name = control.value as string;
    const exists = existingNames
      .find(n => n.toLowerCase() === name.toLowerCase());
    const hasBankName = name.toLowerCase() === 'bank';
    return exists || hasBankName ? { uniqueName: true } : null;
  };
}
