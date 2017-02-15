import * as express from "express";

import { ControllerBase } from "./controller-base";
import { IOrderModel }   from "../app/model";
import { OrderBusiness } from "../app/business";
import { ErrorTypes, ErrorHandler } from './error/error-handler';

export class OrderController extends ControllerBase<IOrderModel> {

	constructor() {
		super(new OrderBusiness());
	}

	getPersonOrders(req: express.Request, res: express.Response): void {
		(this.itemBusiness as OrderBusiness)
			.getPersonOrders(req.params.id)
			.then((result: any) => res.status(200).send(result))
			.catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.FIND));
	}

	getPersonContacts(req: express.Request, res: express.Response): void {
		(this.itemBusiness as OrderBusiness)
			.getPersonContacts(req.params.id)
			.then((result: any) => res.status(200).send(result))
			.catch((error: any) => ErrorHandler.handleError(res, error, ErrorTypes.FIND));
	}

}