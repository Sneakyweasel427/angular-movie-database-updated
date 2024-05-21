import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: true
})
export class MapPipe implements PipeTransform {
  public transform<T, R>(thisArg: T, mapFn: (t: T, ...others: any[]) => R, ...args: any[]): R {
    return mapFn(thisArg, ...args);
  }
}
