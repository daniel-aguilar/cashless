import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Account } from 'src/app/auth/account';

export function uniqueName(existingPlayers: Account[]): ValidatorFn {
  return (control: AbstractControl) => {
    const name = control.value as string;
    const exists = existingPlayers
      .find(p => p.name.toLowerCase() === name.toLowerCase());
    return exists ? { uniqueName: true } : null;
  };
}
