import { Injectable } from '@angular/core';

import { Factory } from './factory';
import { RepositoryService } from '../repository';
import { InfoMessageType } from '../';
import { Entity, newIEntity, IOrderJSON, Order, Contact } from '../model';

@Injectable()
export class FactoryOrder extends Factory<Order>{

	constructor(protected repository: RepositoryService) {
		super(repository);
	}

	filterFn(item: Entity): boolean {
		return item instanceof Order;
	}

	create(data: IOrderJSON): Order {
		let order = new Order(Object.assign(data, {
			owner:  this.resolve(data.id, 'owner', data.owner),
			contact: <Contact>this.resolve(data.id, 'contact', data.contact)
		}));
		this.repository.add(order);
		return order;
	}

	createNew(owner: Contact): Order {
		return new Order(Object.assign(newIEntity, {
			owner:   owner,
			contact: owner,
			text:    '',
			status:  0,
			phone: '',
			done: ''
		}));
	}

	load(data: IOrderJSON[]): Order[] {
		return data.map(orderData => this.create(orderData));
	}

	getList(owner: Contact) {
		return <Order[]>this.repository.toArray(this.filterFn)
			.filter((item: Order) => !owner);
	}

	get(id: string): Order {
		return <Order>super.get(id);
	}

	saveControl(message: Order): InfoMessageType {
		if (message.text.trim() === '') {
			return { result: false, message: 'Не заполнен текст заявки.'};
		}
		return { result: true };
	}

	static filterFn(entity: Order, filter: string): boolean {
		return entity.contact.personTo.desc.toUpperCase().includes(filter.toUpperCase())
			|| entity.contact.personFrom.desc.toUpperCase().includes(filter.toUpperCase())
			|| entity.text.toUpperCase().includes(filter.toUpperCase())
			|| entity.date.toUpperCase().includes(filter.toUpperCase());
	}

	static sortFn(a: Order, b: Order): number {
		if (a.date > b.date)   return -1;
		if (a.date === b.date) return 0;
		if (a.date < b.date)   return 1;
	}

}
