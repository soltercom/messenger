import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Person, Contact } from '../../shared/model';
import { PersonService, ContactService } from '../data';

@Injectable()
export class ContactListResolver implements Resolve<Contact[]> {

  constructor(private personService: PersonService,
              private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact[]> {
    let person_id = route.params['person'];
    return this.personService.get(person_id)
      .mergeMap(person => this.contactService.getList(person))
	    .catch((err: any) => {
        console.log('RESOLVER ERROR: ', err);
        return Observable.of([]);
      });
  }
}