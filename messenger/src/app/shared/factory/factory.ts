import { RepositoryService } from '../repository';
import { InfoMessageType } from '../';
import { IEntityJSON, IEntity, Entity } from '../model';
let uuid = require('node-uuid');

export abstract class Factory<T extends Entity> {

	constructor(protected repository: RepositoryService) {}

	protected abstract filterFn(item: T): boolean;
	abstract create(data: IEntityJSON): T;
  abstract load(data: IEntityJSON[]): T[];
  abstract getList(owner: Entity): T[];
  abstract createNew(owner?: Entity): T;
	abstract saveControl(entity: Entity): InfoMessageType;

	static createId(): string { return uuid.v4(); }

  static filterFn(entity: Entity, filter: string): boolean {
    return entity.desc.toUpperCase().includes(filter.toUpperCase());
  }

  static sortFn(a: Entity, b: Entity): number {
    if (a.desc > b.desc)   return 1;
    if (a.desc === b.desc) return 0;
    if (a.desc < b.desc)   return -1;
  }

	resolve(id: string, key: string, entity_id: string): Entity {
		if (!entity_id) return null;
		let entity = this.repository.get(entity_id);
		if (!entity)
			this.repository.addUnresolved(id, key, entity_id);
		return entity;
	}

  get(id: string): Entity {
    return this.repository.get(id);
  }

	update(data: Entity): Entity {
		let entity = this.get(data.id);
		if (entity) {
			entity.update(data);
		}
		return entity;
	}

}
