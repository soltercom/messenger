import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Person, Client } from '../../shared/model';
import { ClientService, PersonService } from '../data';

@Injectable()
export class PersonListResolver implements Resolve<Person[]> {

  constructor(private clientService: ClientService,
              private personService: PersonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Person[]> {
    let client_id = route.params['client'];
    return this.clientService.get(client_id)
      .mergeMap(client => this.personService.getList(client))
      .catch((err: any) => {
        console.log('RESOLVER ERROR: ', err);
        return Observable.of([]);
      });;
  }
}