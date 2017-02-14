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
		(this.itemBusiness as MessageBusiness)
			.getPersonMessages(req.params.id)
			.then((result: any) => res.status(200).send(result))
			.catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.FIND));
	}

}