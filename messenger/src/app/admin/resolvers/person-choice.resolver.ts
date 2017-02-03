import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Person } from '../../shared/model';
import { PersonService } from '../data';

@Injectable()
export class PersonChoiceResolver implements Resolve<Person[]> {

  constructor(private personService: PersonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Person[]> {
    return this.personService.getList(null).catch((err: any) => {
      console.log('RESOLVER ERROR: ', err);
      return Observable.of([]);
    });;
  }
}