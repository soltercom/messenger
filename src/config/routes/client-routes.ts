import * as express from "express";
import { ClientController } from "./../../controllers";

let router = express.Router();

export class ClientRoutes {

  private clientController: ClientController;

  constructor () {
    this.clientController = new ClientController();
  }

  get routes () {
    router.get   ("/clients"     , this.clientController.retrieve.bind(this.clientController));
    router.post  ("/clients"     , this.clientController.create.bind(this.clientController));
    router.put   ("/clients/:_id", this.clientController.update.bind(this.clientController));
    router.get   ("/clients/:_id", this.clientController.findById.bind(this.clientController));

    return router;
  }

}