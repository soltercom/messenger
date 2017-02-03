import { ControllerBase } from "./controller-base";
import { IClientModel }   from "../app/model";
import { ClientBusiness } from "../app/business";

export class ClientController extends ControllerBase<IClientModel> {

  constructor() {
    super(new ClientBusiness());
  }

}