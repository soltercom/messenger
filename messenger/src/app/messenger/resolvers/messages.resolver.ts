import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../../login';
import { MessageHttpService } from '../../shared/http';
import { FactoryClient, FactoryPerson,
	       FactoryContact, FactoryMessage } from '../../shared/factory';
import { Message } from '../../shared/model';

@Injectable()
export class MessagesResolver implements Resolve<Observable<Message[]>> {

	constructor(private loginService: LoginService,
	            private messageHttpService: MessageHttpService,
	            private factoryClient: FactoryClient,
	            private factoryPerson: FactoryPerson,
	            private factoryContact: FactoryContact,
	            private factoryMessage: FactoryMessage) {}

	resolve(): Observable<Message[]> {
		let id = this.loginService.user.id;
		return this.messageHttpService.getPersonMessages(id)
			.do((data: any) => data.forEach((item: any) => {
				this.factoryClient.create(item.contact.personFrom.client);
				this.factoryClient.create(item.contact.personTo.client);
				item.contact.personFrom.client = item.contact.personFrom.client.id;
				item.contact.personTo.client   = item.contact.personTo.client.id;
			}))
			.do((data: any) => data.forEach((item: any) => {
				this.factoryPerson.create(item.contact.personFrom);
				this.factoryPerson.create(item.contact.personTo);
				item.contact.personFrom =  item.contact.personFrom.id;
				item.contact.personTo   =  item.contact.personTo.id;
			}))
			.do((data: any) => data.forEach((item: any) => {
				this.factoryContact.create(item.contact);
				item.contact = item.contact.id;
			}))
			.map(data => data.map((item: any) => this.factoryMessage.create(item)));
	}

}