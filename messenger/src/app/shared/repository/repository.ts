import { Injectable } from '@angular/core';
import { Map } from 'immutable';

import { Entity } from '../model';

type unresolved = {id: string, key: string, entity_id: string};

@Injectable()
export class RepositoryService {

	private entityMap: Map<string, Entity> = Map<string, Entity>();
	private unresolved: unresolved[] = [];

	constructor() {}

	add(data: Entity) {
		this.entityMap = this.entityMap.set(data.id, data);
		this.resolve(data);
	}

	get(id: string): Entity {
		if (!id) return null;
		return this.entityMap.get(id);
	}

	toArray(filterFn:(item: Entity)=>boolean): Entity[] {
		return this.entityMap.toArray().filter(filterFn);
	}

	addUnresolved(id: string, key: string, entity_id: string) {
		this.unresolved.push({
			id: id,
			key: key,
			entity_id: entity_id
		})
	}

	resolve(entity: Entity) {
		let array = this.unresolved
			.filter((item: unresolved) => item.entity_id === entity.id);
		array.forEach((item: unresolved) => {
			this.get(item.id)[item.key] = this.get(item.entity_id);
		});
		array.forEach((item: unresolved) => {
			let index = this.unresolved.indexOf(item);
			this.unresolved.splice(index, 1);
		});
	}

	testUnresolved(): unresolved[] { return this.unresolved; }

}
