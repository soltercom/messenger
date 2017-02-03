import { IEntityModel } from "./entity-model";

export interface IPersonModel extends IEntityModel {
  name:   string;
  client: string;
  admin:  boolean;
  pin:    string;
}