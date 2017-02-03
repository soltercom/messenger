import * as express from "express";

import { ControllerBase } from "./controller-base";
import { IMessageModel }   from "../app/model";
import { MessageBusiness } from "../app/business";
import { ErrorTypes, ErrorHandler } from './error/error-handler';

export class MessageController extends ControllerBase<IMessageModel> {

	constructor() {
		super(new MessageBusiness());
	}

	getPersonMessages(req: express.Request, res: express.Response): void {
		let {id} = req.params;
		try {
			(this.itemBusiness as MessageBusiness).getPersonMessages(id, (error, result) => {
				ErrorHandler.handleError(res, error, ErrorTypes.FIND);

				res.status(200).send(result);
			});
		} catch (e)  {
			ErrorHandler.handleError(res, e, ErrorTypes.REQUEST);
		}
	}

}