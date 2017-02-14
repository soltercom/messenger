import * as mongoose from "mongoose";

export class RepositoryBase<T extends mongoose.Document> {

  protected _model: mongoose.Model<mongoose.Document>;

  constructor (schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T) {
    return this._model.create(item);
  }

  retrieve() {
    return this._model.find({})
  }

  update(id: string, item: T) {
    return this._model.findOneAndUpdate({_id: id}, item);
  }

  delete(id: string) {
    return this._model.remove({_id: id});
  }

  findById(id: string) {
    return this._model.findById(id);
  }

}