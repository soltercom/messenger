import { BusinessBase } from './business-base';
import { ContactRepository } from '../repository';
import { IContactModel } from "../model";

export class ContactBusiness extends BusinessBase<IContactModel> {

	constructor() {
		super(new ContactRepository());
	}

	getPersonContacts(id: string, callback: (error: any, result: string) => void) {
		(<ContactRepository>this.repository).getPersonContacts(id, callback);
	}

}