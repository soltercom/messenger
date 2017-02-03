import * as mongoose from "mongoose";

import { RepositoryBase } from '../repository';

export class BusinessBase<T extends mongoose.Document> {

  constructor (protected repository: RepositoryBase<T>) {
  }

  create(item: T, callback: (error: any, result: any) => void) {
    this.repository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this.repository.retrieve(callback);
  }

  update(id: string, item: T, callback: (error: any, result: any) => void) {
    this.repository.findById(id, (err, res) => {
      if(err)
        callback(err, res);
      else
        this.repository.update(res._id, item, callback);
    });
  }

  delete(id: string, callback:(error: any, result: any) => void) {
    this.repository.delete(id , callback);
  }

  findById(id: string, callback: (error: any, result: T) => void) {
    this.repository.findById(id, callback);
  }

}
