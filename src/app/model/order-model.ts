import * as mongoose from 'mongoose';
import { IEntityModel } from "./entity-model";

export interface IOrderModel extends mongoose.Document {
	entity:  IEntityModel;
	contact: IEntityModel;
	date?:   string;
	text:    string;
	status:  number;
	phone?:  string;
	done?:   string;
}