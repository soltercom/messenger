import { IEntityJSON, IEntity, Entity } from './entity';
import { Person } from './person';

export interface IContactJSON extends IEntityJSON{
  personFrom?: string;
  personTo?:   string;
  cross?:      string;
}

export interface IContact extends IEntity {
  personFrom?: Person;
  personTo?:   Person;
  cross?:      string;
}

export class Contact extends Entity {

  private _personFrom: Person;
  private _personTo:   Person;
  private _cross:      string;

  constructor(data: IContact) {
    super(data);
    this.personFrom = data.personFrom;
    this.personTo   = data.personTo;
    this._cross     = data.cross;
  }

  clone(): Contact {
    if (!this) return null;
    return new Contact(this.toIEntity());
  }

  update(data: IContact): Contact {
    super.update(data);
    this.personTo = data.personTo || this.personTo;
    this._cross   = data.cross || this.cross;
    return this;
  }

  toServer(): IContactJSON {
    return Object.assign(super.toServer(), {
      personFrom: Entity.getRefId(this.personFrom),
      personTo:   Entity.getRefId(this.personTo),
      cross:      this.cross
    });
  }

  toIEntity(): IContact {
    return Object.assign(super.toIEntity(), {
      personFrom: this.personFrom,
      personTo:   this.personTo,
      cross:      this.cross
    });
  }

  get personFrom() { return this._personFrom; }
  set personFrom(person: Person) {
    this._personFrom = person;
    this.desc = this.getDesc();
  }

  get personTo() { return this._personTo; }
  set personTo(person: Person) {
    this._personTo = person;
    this.desc = this.getDesc();
  }

  get cross() { return this._cross; }

  getDesc(): string {
    return `${this.personFrom? this.personFrom.desc: '???'} - `
      + `${this.personTo? this.personTo.desc: '???'}`;
  }

}
