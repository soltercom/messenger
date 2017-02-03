import { BusinessBase } from './business-base';
import { ClientRepository } from '../repository';
import { IClientModel } from "../model";

export class ClientBusiness extends BusinessBase<IClientModel> {

  constructor() {
    super(new ClientRepository());
  }

}