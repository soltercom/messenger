import * as mongoose from 'mongoose';
(<any>mongoose).Promise = require("bluebird");

import { Constants } from '../../config';
import { IClientModel, IPersonModel, IContactModel, IMessageModel, IOrderModel } from '../model';
import { ClientSchema, PersonSchema, ContactSchema, MessageSchema, OrderSchema } from './';

export class DataAccess {
  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  static clientModel:     mongoose.Model<IClientModel>;
  static personModel:     mongoose.Model<IPersonModel>;
  static contactModel:    mongoose.Model<IContactModel>;
  static messageModel:    mongoose.Model<IMessageModel>;
  static orderModel:      mongoose.Model<IOrderModel>;

  constructor () {
    DataAccess.connect();
  }

  static connect(): mongoose.Connection {
    if (DataAccess.mongooseInstance)
      return DataAccess.mongooseInstance;

    DataAccess.mongooseConnection = mongoose.connection;
    DataAccess.mongooseConnection.once("open", () => {
      console.log("Connect to mongodb.");
    });

    DataAccess.mongooseInstance = mongoose.connect(Constants.DB_CONNECTION_STRING);

    DataAccess.clientModel  = mongoose.model<IClientModel>("Client",   ClientSchema.schema);
    DataAccess.personModel  = mongoose.model<IPersonModel>("Person",   PersonSchema.schema);
    DataAccess.contactModel = mongoose.model<IContactModel>("Contact", ContactSchema.schema);
    DataAccess.messageModel = mongoose.model<IMessageModel>("Message", MessageSchema.schema);
    DataAccess.orderModel   = mongoose.model<IOrderModel>("Order",     OrderSchema.schema);

    return DataAccess.mongooseInstance;
  }

}
