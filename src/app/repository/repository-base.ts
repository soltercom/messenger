import * as mongoose from "mongoose";

export class RepositoryBase<T extends mongoose.Document> {

  protected _model: mongoose.Model<mongoose.Document>;

  constructor (schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: any) => void) {
    this._model.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._model.find({}, callback)
  }

  update(id: string, item: T, callback: (error: any, result: any) => void) {
    this._model.findOneAndUpdate({_id: id}, item, callback);
  }

  delete(id: string, callback:(error: any, result: any) => void) {
    this._model.remove({_id: id}, (err) => callback(err, null));
  }

  findById(id: string, callback: (error: any, result: T) => void) {
    this._model.findById(id, callback);
  }

}