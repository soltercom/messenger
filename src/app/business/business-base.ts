import * as mongoose from "mongoose";

import { RepositoryBase } from '../repository';

export class BusinessBase<T extends mongoose.Document> {

  constructor (protected repository: RepositoryBase<T>) {
  }

  create(item: T) {
    return this.repository.create(item);
  }

  retrieve() {
    return this.repository.retrieve();
  }

  update(id: string, item: T) {
    return this.findById(id).then((res: any) => {
      return this.repository.update(res._id, item);
    });
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

}
