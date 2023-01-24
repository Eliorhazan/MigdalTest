import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heb-alphabetically'
})

export class HebalphabeticallyPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return [...value].sort((a, b) => {
      return  a.Name.localeCompare(b.Name)
    }
  )}
}
