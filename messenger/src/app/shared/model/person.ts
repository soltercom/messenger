import { IEntityJSON, IEntity, Entity } from './entity';
import { Client } from './client';

export interface IPersonJSON extends IEntityJSON{
  name?:   string;
  client?: string;
  pin?:    string;
  admin?:  boolean;
}

export interface IPerson extends IEntity {
  name?:   string;
  client?: Client;
  pin?:    string;
  admin?:  boolean;
}

export class Person extends Entity {

  private _name:   string;
  private _client: Client;
  private _admin:  boolean;
  private _pin:    string;

  constructor(data: IPerson) {
    super(data);
    this.name   = data.name;
    this.client = data.client;
    this.admin  = data.admin;
    this.pin    = data.pin;
  }

  clone(): Person {
    if (!this) return null;
    return new Person(this.toIEntity());
  }

  update(data: IPerson): Person {
    super.update(data);
    this.name  = data.name || this.name;
    this.admin = data.admin === undefined ? this.admin: data.admin;
    this.pin   = data.pin || this.pin;
    return this;
  }

  toServer(): IPersonJSON {
    return Object.assign(super.toServer(), {
      client: Entity.getRefId(this.client),
      name:   this.name,
      admin:  this.admin,
      pin:    this.pin
    });
  }

  toIEntity(): IPerson {
    return Object.assign(super.toIEntity(), {
      client: this.client,
      name:   this.name,
      admin:  this.admin,
      pin:    this.pin
    });
  }

  get name() { return this._name; }
  set name(name: string) {
    this._name = name;
    this.desc = this.getDesc();
  }

  get client() { return this._client; }
  set client(client: Client ) {
    this._client = client;
    this.desc = this.getDesc();
  }

  get admin() { return this._admin; }
  set admin(admin: boolean) {
    this._admin = admin;
  }

  get pin() { return this._pin; }
  set pin(pin: string) {
    this._pin = pin;
  }

  getDesc(): string {
    return `${this.name} (${this.client? this.client.desc: '???'})`;
  }

}
