import { Injectable } from '@angular/core';

import { Factory } from './factory';
import { InfoMessageType } from '..';
import { RepositoryService } from '../repository';
import { Entity, newIEntity, Person, IContactJSON, IContact, Contact } from '../model';

@Injectable()
export class FactoryContact extends Factory<Contact>{

  constructor(protected repository: RepositoryService) {
    super(repository);
  }

	filterFn(item: Entity) {
		return item instanceof Contact;
	}

	create(data: IContactJSON): Contact {
		let contact = new Contact(Object.assign(data, {
			owner:      this.resolve(data.id, 'owner', data.owner),
			personFrom: <Person>this.resolve(data.id, 'personFrom', data.personFrom),
			personTo:   <Person>this.resolve(data.id, 'personTo', data.personTo)
		}));
		this.repository.add(contact);
		return contact;
	}

	createNew(owner: Person): Contact {
		return new Contact(Object.assign(newIEntity, {
			owner:      owner,
			personFrom: owner,
			personTo:   null
		}));
	}

	createCross(contact: Contact): Contact {
  	return new Contact(Object.assign(contact.toServer(), {
		  owner:      contact.personTo,
		  personFrom: contact.personTo,
		  personTo:   contact.personFrom,
		  cross:      contact.id,
		  id:         contact.cross
	  }));
	}

  load(data: IContactJSON[]): Contact[] {
    return data.map(contactData => this.create(contactData));
  }

  getList(owner: Person) {
    return <Contact[]>this.repository.toArray(this.filterFn)
	    .filter(item => !owner || item.owner.isEqual(owner));
  }

  get(id: string): Contact {
    return <Contact>super.get(id);
  }

	saveControl(contact: Contact): InfoMessageType {
		if (!contact.owner) {
			return { result: false, message: 'Не заполнен владелец контакта.'};
		}
		if (!contact.personFrom) {
			return { result: false, message: 'Не заполнен владелец контакта.'};
		}
		if (!contact.personTo) {
			return { result: false, message: 'Не заполнен адресат контакта.'};
		}
		if (contact.personFrom.isEqual(contact.personTo)) {
			return { result: false, message: 'Отправитель и получатель должны различаться.'};
		}

		if ((<Contact[]>this.repository.toArray(this.filterFn)
			.filter((entity: Contact) =>
			     entity.personFrom.isEqual(contact.personFrom)
			  && entity.personTo.isEqual(contact.personTo))).length > 0) {
			return { result: false, message: 'Подобный контакт уже есть.'}
		}

		return { result: true };
	}

	static filterFn(entity: Contact, filter: string): boolean {
		return entity.personTo.desc.toUpperCase().includes(filter.toUpperCase());
	}

}
