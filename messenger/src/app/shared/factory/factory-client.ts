import { Injectable } from '@angular/core';

import { Factory } from './factory';
import { InfoMessageType } from '../';
import { RepositoryService } from '../repository';
import { Entity, newIEntity, IClientJSON, IClient, Client } from '../model';

@Injectable()
export class FactoryClient extends Factory<Client> {

  constructor(protected repository: RepositoryService) {
    super(repository);
  }

	protected filterFn(item: Entity): boolean {
		return item instanceof Client;
	}

	create(data: IClientJSON): Client {
		let client = new Client(Object.assign(data, {
			owner: this.resolve(data.id, 'owner', data.owner)
		}));
		this.repository.add(client);
		return client;
	}

	createNew(): Client {
    return new Client(Object.assign(newIEntity, {
      name: ''
    }));
  }

  load(data: IClientJSON[]): Client[] {
    return data.map(clientData => this.create(clientData));
  }

  getList(owner: Entity) {
	  return <Client[]>this.repository.toArray(this.filterFn);
  }

  get(id: string): Client {
    return <Client>super.get(id);
  }

	saveControl(client: Client): InfoMessageType {
  	if (client.name.trim() === '') {
  		return { result: false, message: 'Не заполнено название клиента.' };
	  }
	  return { result: true };
	}

}
