import * as mongoose from 'mongoose';

import { IContactModel, IMessageModel } from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess } from '../data-access';

export class MessageRepository extends RepositoryBase<IMessageModel> {

	private contactModel: mongoose.Model<IContactModel>;

	constructor () {
		super(DataAccess.messageModel);
		this.contactModel = DataAccess.contactModel;
	}

	getPersonMessages(id: string) {
		let condition = {$or: [{ 'personFrom': id }, { 'personTo': id }]};

		return this.contactModel.find(condition, 'id')
			.then((res: any) => {
				return this._model.find({'contact': { $in: res }})
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

  getNewIncomePersonMessages(id: string) {
    return this.contactModel.find({ 'personTo': id }, 'id')
	    .then((res: any) => {
	      return this._model.find({'contact': { $in: res }, 'new': true})
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

}