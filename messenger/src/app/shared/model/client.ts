import { IEntityJSON, IEntity, Entity } from './entity';

export interface IClientJSON extends IEntityJSON{
  name?: string;
}

export interface IClient extends IEntity {
  name?: string;
}

export class Client extends Entity {

  private _name: string;

  constructor(data: IClient) {
    super(data);
    this.name = data.name;
  }

  clone(): Client {
    if (!this) return null;
    return new Client(this.toIEntity());
  }

  update(data: IClient): Client {
    super.update(data);
    this.name = data.name || this.name;
    return this;
  }

  toServer(): IClientJSON {
    return Object.assign(super.toServer(), {
      name: this.name
    });
  }

  toIEntity(): IClient {
    return Object.assign(super.toIEntity(), {
      name: this.name
    });
  }

  get name() { return this._name; }
  set name(name: string) {
    this._name = name;
    this.desc = name;
  }

}
