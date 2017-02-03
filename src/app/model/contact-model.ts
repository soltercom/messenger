import { IEntityModel } from "./entity-model";

export interface IContactModel extends IEntityModel {
	cross:      string;
	personFrom: string;
	personTo:   string;
}