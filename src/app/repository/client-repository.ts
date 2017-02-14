import { IClientModel }   from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess }     from '../data-access';

export class ClientRepository extends RepositoryBase<IClientModel> {
  constructor () {
    super(DataAccess.clientModel);
  }

}