import { IPersonModel } from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess } from '../data-access';

export class PersonRepository extends RepositoryBase<IPersonModel> {
  constructor () {
    super(DataAccess.personModel);
  }

  getAllPINs() {
    return this._model.find({}, 'pin');
  }

  login(pin: string) {
    return this._model.findOne({pin: pin}).populate('client');
  }

}