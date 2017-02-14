import { IContactModel }  from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess }     from '../data-access';

export class ContactRepository extends RepositoryBase<IContactModel> {

	constructor () {
		super(DataAccess.contactModel);
	}

	getPersonContacts(id: string) {
		let condition = { $or: [{ 'personFrom': id }, { 'personTo': id }]};
		return this._model.find(condition)
			.populate({
				path: 'personFrom personTo',
				populate: {
					path: 'client'
				}
			});
	}

}