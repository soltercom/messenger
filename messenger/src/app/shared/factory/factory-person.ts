import { Injectable } from '@angular/core';

import { Factory } from './factory';
import { RepositoryService } from '../repository';
import { InfoMessageType } from '../';
import { Entity, newIEntity, Client, IPersonJSON, IPerson, Person } from '../model';

@Injectable()
export class FactoryPerson extends Factory<Person>{

  constructor(protected repository: RepositoryService) {
    super(repository);
  }

	filterFn(item: Entity): boolean {
		return item instanceof Person;
	}

	create(data: IPersonJSON): Person {
		let person = new Person(Object.assign(data, {
			owner:  this.resolve(data.id, 'owner', data.owner),
			client: <Client>this.resolve(data.id, 'client', data.client)
		}));
		this.repository.add(person);
		return person;
	}

	createNew(owner: Client): Person {
		return new Person(Object.assign(newIEntity, {
			name:   '',
			owner:  owner,
			client: owner,
			pin:    '',
			admin:  false
		}));
	}

  load(data: IPersonJSON[]): Person[] {
    return data.map(personData => this.create(personData));
  }

  getList(owner: Client) {
    return <Person[]>this.repository.toArray(this.filterFn)
	    .filter(item => !owner || item.owner.isEqual(owner));
  }

  get(id: string): Person {
    return <Person>super.get(id);
  }

	saveControl(person: Person): InfoMessageType {
  	if (!person.owner) {
		  return { result: false, message: 'Не заполнен владелец пользователя.'};
	  }
		if (person.name.trim() === '') {
			return { result: false, message: 'Не заполнено имя пользователя.'};
		}
		return { result: true };
	}

}
