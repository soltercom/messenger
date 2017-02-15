import * as mongoose from 'mongoose';

import { IContactModel, IOrderModel } from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess } from '../data-access';
import {IPersonModel} from "../model/person-model";

export class OrderRepository extends RepositoryBase<IOrderModel> {

	private contactModel: mongoose.Model<IContactModel>;
	private personModel: mongoose.Model<IPersonModel>;

	constructor () {
		super(DataAccess.orderModel);
		this.contactModel = DataAccess.contactModel;
		this.personModel  = DataAccess.personModel;
	}

	getPersonOrders(id: string) {
		return this.contactModel.find({ 'personFrom': id }, 'id')
			.then((res: any) => {
				return this._model.find({ 'contact': { $in: res } })
					.populate({
						path: 'contact',
						populate: {
							path: 'personFrom personTo',
							populate: {
								path: 'client'
							}
						}
					});
			});
	}

	getPersonContacts(id: string) {
		return this.personModel.find({ 'admin': true }, 'id')
			.then((res: any) => {
			let condition = {$and: [{ 'personFrom': id }, { 'personTo': { $in: res } }]};
				return this.contactModel.find(condition)
					.populate({
						path: 'personFrom personTo',
							populate: {
							path: 'client'
						}
					});
			});
	}

}