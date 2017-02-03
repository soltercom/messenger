import * as express from "express";
import { ContactController } from "./../../controllers";

let router = express.Router();

export class ContactRoutes {

	private contactController: ContactController;

	constructor () {
		this.contactController = new ContactController();
	}

	get routes () {
		router.get ("/contacts"     , this.contactController.retrieve.bind(this.contactController));
		router.post("/contacts"     , this.contactController.create.bind(this.contactController));
		router.put ("/contacts/:_id", this.contactController.update.bind(this.contactController));
		router.get ("/contacts/person/:id", this.contactController.getPersonContacts.bind(this.contactController));
		router.get ("/contacts/:_id", this.contactController.findById.bind(this.contactController));

		return router;
	}

}