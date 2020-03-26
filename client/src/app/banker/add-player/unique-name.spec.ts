import { uniqueName } from './unique-name';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/auth/account';

describe('uniqueNameTest', () => {
  it('Should validate control', () => {
    const control = new FormControl();
    const fn = uniqueName([
      { name: 'Alice' } as Account,
      { name: 'Bob' } as Account,
    ]);

    control.setValue('alice');
    expect(fn(control)).toEqual({ uniqueName: true });

    control.setValue('Daniel');
    expect(fn(control)).toBeNull();
  });
});
