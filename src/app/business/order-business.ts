import { BusinessBase } from './business-base';
import { OrderRepository } from '../repository';
import { IOrderModel } from "../model";

export class OrderBusiness extends BusinessBase<IOrderModel> {

	constructor() {
		super(new OrderRepository());
	}

	getPersonOrders(id: string) {
		return (<OrderRepository>this.repository).getPersonOrders(id);
	}

	getPersonContacts(id: string) {
		return (<OrderRepository>this.repository).getPersonContacts(id);
	}

}