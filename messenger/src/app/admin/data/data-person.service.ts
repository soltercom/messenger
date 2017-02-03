import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InfoService } from '../../shared';
import { DataService } from './data.service';
import { PersonHttpService } from '../../shared/http';
import { FactoryPerson } from '../../shared/factory';
import { IPersonJSON, IPerson, Person } from '../../shared/model';

@Injectable()
export class PersonService extends DataService<Person, IPersonJSON> {

  protected loaded: boolean;

  constructor(protected personHttpService: PersonHttpService,
              protected factoryPerson: FactoryPerson,
              protected infoService: InfoService) {
    super(personHttpService, factoryPerson, infoService);
    this.loaded = false;
  }

  add(person: Person): Observable<Person> {
    return this.personHttpService.getNewPIN()
      .map((pin: string) => person.update({pin: pin}))
      .mergeMap((person: Person) => this.personHttpService.add(person.toServer()))
			.map(entity => this.factoryPerson.create(entity));
  }

}