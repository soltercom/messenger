import { BusinessBase } from './business-base';
import { MessageRepository } from '../repository';
import { IMessageModel } from "../model";

export class MessageBusiness extends BusinessBase<IMessageModel> {

	constructor() {
		super(new MessageRepository());
	}

	getPersonMessages(id: string, callback: (error: any, result: string) => void) {
		(<MessageRepository>this.repository).getPersonMessages(id, callback);
	}

}