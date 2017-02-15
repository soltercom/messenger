import { IEntityJSON, IEntity, Entity } from './entity';

export interface IClientJSON extends IEntityJSON{
  name?: string;
  inn?: string;
}

export interface IClient extends IEntity {
  name?: string;
  inn?: string;
}

export class Client extends Entity {

  private _name: string;
  private _inn: string;

  constructor(data: IClient) {
    super(data);
    this.name = data.name;
    this.inn = data.inn;
  }

  clone(): Client {
    if (!this) return null;
    return new Client(this.toIEntity());
  }

  update(data: IClient): Client {
    super.update(data);
    this.name = data.name || this.name;
    this.inn  = data.inn  || this.inn;
    return this;
  }

  toServer(): IClientJSON {
    return Object.assign(super.toServer(), {
      name: this.name,
      inn:  this.inn
    });
  }

  toIEntity(): IClient {
    return Object.assign(super.toIEntity(), {
      name: this.name,
      inn:  this.inn
    });
  }

  get name() { return this._name; }
  set name(name: string) {
    this._name = name;
    this.desc = name;
  }
  get inn() { return this._inn; }
  set inn(inn: string) { this._inn = inn; }

}
