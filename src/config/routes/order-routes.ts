import * as express from "express";
import { OrderController } from "./../../controllers";

let router = express.Router();

export class OrderRoutes {

	private orderController: OrderController;

	constructor () {
		this.orderController = new OrderController();
	}

	get routes () {
		router.get ("/orders"     ,         this.orderController.retrieve.bind(this.orderController));
		router.post("/orders"     ,         this.orderController.create.bind(this.orderController));
		router.put ("/orders/:_id",         this.orderController.update.bind(this.orderController));
		router.get ("/orders/person/:id",   this.orderController.getPersonOrders.bind(this.orderController));
		router.get ("/orders/contacts/:id", this.orderController.getPersonContacts.bind(this.orderController));
		router.get ("/orders/:_id",         this.orderController.findById.bind(this.orderController));

		return router;
	}

}