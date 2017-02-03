import * as express from "express";
import { PersonController, ContactController } from "./../../controllers";

let router = express.Router();

export class PersonRoutes {

  private personController: PersonController;

  constructor () {
    this.personController = new PersonController();
  }

  get routes () {
    router.get ("/people"          , this.personController.retrieve.bind(this.personController));
    router.post("/people"          , this.personController.create.bind(this.personController));
    router.get ("/people/getNewPIN", this.personController.getNewPIN.bind(this.personController));
    router.put ("/people/:_id"     , this.personController.update.bind(this.personController));
    router.get ("/people/:_id"     , this.personController.findById.bind(this.personController));

    router.post("/login", this.personController.login.bind(this.personController));

    return router;
  }

}