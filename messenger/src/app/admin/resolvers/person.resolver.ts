import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Person, Entity } from '../../shared/model';
import { PersonService, ClientService } from '../data';

@Injectable()
export class PersonResolver implements Resolve<Observable<Person>> {

	constructor(private clientService: ClientService,
	            private personService: PersonService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<Person> {
		let client_id = route.params['client'];
		let person_id = route.params['person'];

		if (Entity.isNewId(person_id)) {
			return this.clientService.get(client_id)
				.mergeMap(client => this.personService.createNew(client));
		} else {
			return this.personService.get(person_id);
		}

	}

}