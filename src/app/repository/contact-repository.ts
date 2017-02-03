import { IContactModel } from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess } from '../data-access';

export class ContactRepository extends RepositoryBase<IContactModel> {

	constructor () {
		super(DataAccess.contactModel);
	}

	getPersonContacts(id: string, callback: (error: any, result: any) => void) {
		this._model.find({ $or: [{ 'personFrom': id }, { 'personTo': id }]}, callback)
			.populate({
				path: 'personFrom personTo',
				populate: {
					path: 'client'
				}
			});
	}

}