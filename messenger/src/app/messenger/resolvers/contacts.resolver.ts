import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../../login';
import { ContactHttpService } from '../../shared/http';
import { FactoryClient, FactoryPerson, FactoryContact } from '../../shared/factory';
import { Contact } from '../../shared/model';

@Injectable()
export class ContactsResolver implements Resolve<Observable<Contact[]>> {

	constructor(private loginService: LoginService,
	            private contactHttpService: ContactHttpService,
	            private factoryClient: FactoryClient,
	            private factoryPerson: FactoryPerson,
	            private factoryContact: FactoryContact) {}

	resolve(): Observable<Contact[]> {
		let id = this.loginService.user.id;
		return this.contactHttpService.getPersonContacts(id)
			.do(data => data.forEach((item: any) => {
				this.factoryClient.create(item.personFrom.client);
				this.factoryClient.create(item.personTo.client);
				item.personFrom.client = item.personFrom.client.id;
				item.personTo.client   = item.personTo.client.id;
			}))
			.do(data => data.forEach((item: any) => {
				this.factoryPerson.create(item.personFrom);
				this.factoryPerson.create(item.personTo);
				item.personFrom = item.personFrom.id;
				item.personTo   = item.personTo.id;
			}))
			.map(data => data.map((item: any) => this.factoryContact.create(item)))
			.map(data => data.filter((contact: Contact) => contact.personFrom.id === id));
	}

}