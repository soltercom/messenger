import { IPersonModel } from '../model';
import { RepositoryBase } from './repository-base';
import { DataAccess } from '../data-access';

export class PersonRepository extends RepositoryBase<IPersonModel> {
  constructor () {
    super(DataAccess.personModel);
  }

  getAllPINs(callback: (error: any, result: any) => void) {
    this._model.find({}, 'pin', callback);
  }

  login(pin: string, callback: (error: any, result: any) => void) {
    this._model.findOne({pin: pin}, callback).populate('client');
  }

}