import * as mongoose from 'mongoose';

export interface IEntityModel extends mongoose.Document {
  _id:     string;
  deleted: boolean;
  desc:    string;
  owner:   string;
}