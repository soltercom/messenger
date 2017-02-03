import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../data';
import { Entity, IEntity, IEntityJSON } from '../../../shared/model';
import { DetailFieldMetadata } from '../../components';
import { NavigateService } from '../../metadata';
import { FormMessage } from '../../../shared';

export abstract class EntityDetail<T extends Entity, J extends IEntityJSON> implements OnInit {

  protected entity: T;
	protected abstract data: IEntity;
	protected metadata: DetailFieldMetadata[];

  constructor(protected route: ActivatedRoute,
              protected dataService: DataService<T, J>,
              protected navigateService: NavigateService) {}

	ngOnInit() {
		this.navigateService.update(this.route.snapshot);
	}

	get editRegime(): boolean {
  	if (!this.entity) return false;
  	return Entity.isNewId(this.entity.id);
	}

	onMessage(message: {action: string, data?: any}) {
		switch (message.action) {
			case FormMessage.OK: {
			  this.dataService.fromDetail(this.entity, message.data)
				  .subscribe(() => {
            this.navigateService.toList(this.route.snapshot);
          }, () => { console.error('ERROR'); });
				break;
			}
			case FormMessage.SAVE: {
				this.dataService.fromDetail(this.entity, message.data)
					.subscribe((entity: T) => {
						this.navigateService.toDetail2(this.route.snapshot, entity.id);
					}, () => console.error('ERROR'));
				break;
			}
			case FormMessage.CANCEL: {
				this.navigateService.toList(this.route.snapshot);
				break;
			}
			case FormMessage.START_CHOICE: {
				this.navigateService.startChoice(this.route.snapshot, message.data);
			}
		}
	}

	entityToData(): IEntity {
    this.data = {};
    this.metadata.forEach(m => {
    	this.data[m.name] = this.entity[m.name];
    });
    return this.data;
	}

}