import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InfoService, InfoMessageType } from '../../shared';
import { DataService } from './data.service';
import { ContactHttpService } from '../../shared/http';
import { FactoryContact, Factory } from '../../shared/factory';
import { IContactJSON, Entity, Person, Contact } from '../../shared/model';

@Injectable()
export class ContactService extends DataService<Contact, IContactJSON> {

  protected loaded: boolean;

  constructor(protected contactHttpService: ContactHttpService,
              protected factoryContact: FactoryContact,
              protected infoService: InfoService) {
    super(contactHttpService, factoryContact, infoService);
    this.loaded = false;
  }

  fromDetail(entity: Contact, data: any): Observable<Contact> {
    entity.update(data);

    let info: InfoMessageType = this.factory.saveControl(entity);
    if (!info.result) {
      this.infoService.message(info.message, 'Ошибка записи.');
      return Observable.throw(null);
    }

    if (Entity.isNewId(entity.id)) {
      entity.update({id: Factory.createId(), cross: Factory.createId()});
      let cross = this.factoryContact.createCross(entity);
      return this.add(cross).mergeMap(() => this.add(entity));
    } else {
      let cross = this.factoryContact.get(entity.cross);
      cross.deleted = entity.deleted;
      return this.update(cross).mergeMap(() => this.update(entity));
    }
  }

}