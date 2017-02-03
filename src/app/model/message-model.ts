import * as mongoose from 'mongoose';
import { IEntityModel } from "./entity-model";

export interface IMessageModel extends mongoose.Document {
	entity:  IEntityModel;
	contact: IEntityModel;
	date?:   string;
	text:    string;
	new?:    boolean;
}