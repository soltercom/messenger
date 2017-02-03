import { Injectable } from '@angular/core';

import { Factory } from './factory';
import { RepositoryService } from '../repository';
import { InfoMessageType } from '../';
import { Entity, newIEntity, IMessageJSON, Message, Contact, Person } from '../model';

@Injectable()
export class FactoryMessage extends Factory<Message>{

	constructor(protected repository: RepositoryService) {
		super(repository);
	}

	filterFn(item: Entity): boolean {
		return item instanceof Message;
	}

	create(data: IMessageJSON): Message {
		let message = new Message(Object.assign(data, {
			owner:  this.resolve(data.id, 'owner', data.owner),
			contact: <Contact>this.resolve(data.id, 'contact', data.contact)
		}));
		this.repository.add(message);
		return message;
	}

	createNew(owner: Contact): Message {
		return new Message(Object.assign(newIEntity, {
			owner:   owner,
			contact: owner,
			text:    '',
			new:     true
		}));
	}

	load(data: IMessageJSON[]): Message[] {
		return data.map(messageData => this.create(messageData));
	}

	getList(owner: Person) {
		return <Message[]>this.repository.toArray(this.filterFn)
			.filter((item: Message) => !owner
			|| item.contact.personTo.isEqual(owner)
			|| item.contact.personFrom.isEqual(owner));
	}

	get(id: string): Message {
		return <Message>super.get(id);
	}

	saveControl(message: Message): InfoMessageType {
		if (message.text.trim() === '') {
			return { result: false, message: 'Не заполнен текст сообщения.'};
		}
		return { result: true };
	}

	static filterFn(entity: Message, filter: string): boolean {
	  console.log(entity);
		return entity.contact.personTo.desc.toUpperCase().includes(filter.toUpperCase())
			|| entity.contact.personFrom.desc.toUpperCase().includes(filter.toUpperCase())
			|| entity.text.toUpperCase().includes(filter.toUpperCase())
			|| entity.date.toUpperCase().includes(filter.toUpperCase());
	}

	static sortFn(a: Message, b: Message): number {
		if (a.date > b.date)   return -1;
		if (a.date === b.date) return 0;
		if (a.date < b.date)   return 1;
	}

	testRepository(): Entity[] {
		return this.repository.toArray(item => true);
	}

}
