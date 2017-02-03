import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Entity, Contact } from '../../shared/model';
import { PersonService, ContactService } from '../data';

@Injectable()
export class ContactResolver implements Resolve<Observable<Contact>> {

  constructor(private personService: PersonService,
              private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    let person_id  = route.params['person'];
    let contact_id = route.params['contact'];

    if (Entity.isNewId(contact_id)) {
      return this.personService.get(person_id)
			  .mergeMap(person => this.contactService.createNew(person));
    } else {
      return this.contactService.get(contact_id);
    }

  }

}