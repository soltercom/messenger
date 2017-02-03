import { Injectable } from '@angular/core';
import { Resolve }    from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClientService } from '../data';
import { Client } from '../../shared/model';

@Injectable()
export class ClientListResolver implements Resolve<Observable<Client[]>>{

  constructor(private clientService: ClientService) {}

	resolve(): Observable<Client[]> {
    return this.clientService.getList(null)
	    .catch((err: any) => {
	    	console.log('RESOLVER ERROR: ', err);
	    	return Observable.of([]);
	    });
	}

}