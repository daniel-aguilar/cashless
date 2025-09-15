import { FormControl } from '@angular/forms';
import { uniqueName } from './unique-name';

describe('uniqueName', () => {
  it('Should validate control', () => {
    const control = new FormControl();
    const fn = uniqueName(['Alice', 'Bob', 'Bank', 'banK']);
    const error = { uniqueName: true };

    control.setValue('alice');
    expect(fn(control)).toEqual(error);

    control.setValue('Daniel');
    expect(fn(control)).toBeNull();

    control.setValue('Bank');
    expect(fn(control)).toEqual(error);
  });
});
