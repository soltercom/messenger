import { Observable } from 'rxjs/Observable';
import '../../rxjs-operators';

import { InfoService, InfoMessageType } from '../../shared';
import { HttpService } from '../../shared/http/http.service';
import { Factory } from '../../shared/factory';
import { IEntityJSON, IEntity, Entity } from '../../shared/model';

export abstract class DataService<T extends Entity, J extends IEntityJSON> {

  protected abstract loaded: boolean;

  constructor(protected httpService: HttpService<J>,
              protected factory: Factory<T>,
              protected infoService: InfoService) {}

  add(entity: T): Observable<T> {
    return this.httpService.add(<J>entity.toServer())
      .map(entity => this.factory.create(entity));
  }

  update(entity: T): Observable<T> {
    return this.httpService.update(<J>entity.toServer())
      .map(() => this.factory.update(entity));
  }

  load(): Observable<boolean> {
    if (this.loaded) {
      return Observable.of(true);
    }
    else {
      return this.httpService.retrieve()
        .do(() => this.loaded = true)
		    .map(data => this.factory.load(data))
        .mapTo(true);
    }
  }

  fromDetail(entity: T, data: any): Observable<T> {
    entity.update(data);

    let info: InfoMessageType = this.factory.saveControl(entity);
    if (!info.result) {
      this.infoService.message(info.message, 'Ошибка записи.');
      return Observable.throw(null);
    }

    if (Entity.isNewId(entity.id)) {
      entity.update({id: Factory.createId()});
      return this.add(entity);
    } else {
      return this.update(entity);
    }
  }

  getList(owner: Entity): Observable<T[]> {
    return this.load().map(() => this.factory.getList(owner));
  }

  get(id: string): Observable<Entity> {
    return this.load().map(() => this.factory.get(id).clone());
  }

  createNew(owner?: Entity): Observable<Entity> {
    return Observable.of(this.factory.createNew(owner));
  }

}