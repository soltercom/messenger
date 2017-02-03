export interface IEntityJSON {
  id?:      string;
  deleted?: boolean;
  desc?:    string;
  owner?:   string;
}

export interface IEntity {
  id?:      string;
  deleted?: boolean;
  desc?:    string;
  owner?:   Entity;
}

export abstract class Entity {

  protected _id:      string;
  protected _deleted: boolean;
  protected _desc:    string;
  protected _owner:   Entity;

  static newId: string = 'new';
  static isNewId(id: string): boolean {
    return id === Entity.newId;
  }

  constructor(data: IEntity) {
    this._id     = data.id;
    this.desc    = data.desc;
    this.deleted = data.deleted;
    this.owner   = data.owner;
  }

  abstract clone(): any;

  update(data: IEntity): Entity {
    this._id     = data.id || this._id;
    this.deleted = data.deleted === undefined ? this.deleted : data.deleted;
    return this;
  }

  toServer(): IEntityJSON {
    return {
      id:      this.id,
      deleted: this.deleted,
      desc:    this.desc,
      owner:   Entity.getRefId(this.owner)
    }
  }

  toIEntity(): IEntity {
    return {
      id:      this.id,
      deleted: this.deleted,
      desc:    this.desc,
      owner:   this.owner
    }
  }

  get id() { return this._id; }
  static getRefId(entity: Entity): string {
    return entity? entity.id: '';
  }

  get desc() { return this._desc; }
  set desc(desc: string) { this._desc = desc; }

  get deleted() { return this._deleted; }
  set deleted(deleted: boolean) { this._deleted = deleted; }

  get owner() { return this._owner; }
  set owner(owner: Entity) { this._owner = owner; }

  toString(): string { return this._desc; }

  isEqual(entity: Entity): boolean {
    if (!entity) return false;
    return this.id === entity.id;
  }

}

export const newIEntity: IEntity = {
  id:      Entity.newId,
  deleted: false,
  desc:    'Новый',
  owner:   null
};

