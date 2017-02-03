import { Injectable }             from '@angular/core';
import { Resolve,
	       ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Entity, Client } from '../../shared/model';
import { ClientService } from '../data';

@Injectable()
export class ClientResolver implements Resolve<Observable<Client>> {

	constructor(private clientService: ClientService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<Client> {
		let client_id = route.params['client'];

		if (Entity.isNewId(client_id)) {
			return this.clientService.createNew();
		} else {
			return this.clientService.get(client_id);
		}
	}

}