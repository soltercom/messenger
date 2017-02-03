import * as express from "express";
import { MessageController } from "./../../controllers";

let router = express.Router();

export class MessageRoutes {

	private messageController: MessageController;

	constructor () {
		this.messageController = new MessageController();
	}

	get routes () {
		router.get ("/messages"     , this.messageController.retrieve.bind(this.messageController));
		router.post("/messages"     , this.messageController.create.bind(this.messageController));
		router.put ("/messages/:_id", this.messageController.update.bind(this.messageController));
		router.get ("/messages/person/:id", this.messageController.getPersonMessages.bind(this.messageController));
		router.get ("/messages/:_id", this.messageController.findById.bind(this.messageController));

		return router;
	}

}