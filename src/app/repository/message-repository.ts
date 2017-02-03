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

	getPersonMessages(id: string, callback: (error: any, result: any) => void) {

		this.contactModel.find({ $or: [
			{ 'personFrom': id },
			{ 'personTo': id }
		]}, 'id', (err, res) => {
			if (err) callback(err, res);

			this._model.find({'contact': { $in: res }}, callback)
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

  getNewIncomePersonMessages(id: string, callback: (error: any, result: any) => void) {
    this.contactModel.find({ 'personTo': id }, 'id', (err, res) => {
      if (err) callback(err, res);

      this._model.find({'contact': { $in: res }, 'new': true}, callback)
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