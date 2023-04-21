import { FormControl } from '@angular/forms';
import { Account } from 'src/app/auth/account';
import { uniqueName } from './unique-name';

describe('uniqueNameTest', () => {
  it('Should validate control', () => {
    const control = new FormControl();
    const fn = uniqueName([
      { name: 'Alice' } as Account,
      { name: 'Bob' } as Account,
      { name: 'Bank' } as Account,
      { name: 'banK' } as Account,
    ]);
    const error = { uniqueName: true };

    control.setValue('alice');
    expect(fn(control)).toEqual(error);

    control.setValue('Daniel');
    expect(fn(control)).toBeNull();

    control.setValue('Bank');
    expect(fn(control)).toEqual(error);
  });
});
