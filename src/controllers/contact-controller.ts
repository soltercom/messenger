import * as express from "express";

import { ControllerBase } from "./controller-base";
import { IContactModel }   from "../app/model";
import { ContactBusiness } from "../app/business";
import { ErrorTypes, ErrorHandler } from './error/error-handler';

export class ContactController extends ControllerBase<IContactModel> {

	constructor() {
		super(new ContactBusiness());
	}

	getPersonContacts(req: express.Request, res: express.Response): void {
		let {id} = req.params;
		try {
			(this.itemBusiness as ContactBusiness).getPersonContacts(id, (error, result) => {
				ErrorHandler.handleError(res, error, ErrorTypes.FIND);

				res.status(200).send(result);
			});
		} catch (e)  {
			ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
		}
	}

}