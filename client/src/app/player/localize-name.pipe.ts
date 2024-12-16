import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localizeName' })
export class LocalizeNamePipe implements PipeTransform {

  transform(name: string): string {
    return name === 'Bank' ? $localize `Bank` : name;
  }
}
