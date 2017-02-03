import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Entity } from '../../../shared/model';
import { FormMessage } from '../../../shared';
import { NavigateService } from '../../metadata';
import { ListFilter } from '../../../shared';

export class EntityList implements OnInit{

  protected _list: Entity[] = [];
  protected _selectedEntity: Entity;

  constructor(protected route: ActivatedRoute,
              protected navigateService: NavigateService,
              protected listFilter: ListFilter<Entity>) {}

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.list = data.list;
      this.navigateService.update(this.route.snapshot);
    });
  }

  get selectedEntity(): Entity { return this._selectedEntity; }
  set selectedEntity(entity: Entity) { this._selectedEntity = entity; }

  get list() { return this._list; }

  set list(entities: Entity[]) {
    this._list           = entities;
    this.listFilter.list = entities;
  }

  get filteredList(): Entity[] {
    return this.listFilter.list;
  }

  filterEntity(filter: string) {
    this.listFilter.filter = filter;
  }

  onMessage(message: {action: string, data?: any}) {
    switch (message.action) {
      case FormMessage.ADD: {
        this.navigateService.toDetail(this.route.snapshot, Entity.newId);
        break;
      }
      case FormMessage.SELECT: {
        this.selectedEntity = message.data;
        break;
      }
      case FormMessage.EDIT: {
        this.navigateService.toDetail(this.route.snapshot, message.data.id);
        break;
      }
      case FormMessage.FILTER: {
        this.filterEntity(message.data);
        break;
      }
      case FormMessage.CHOICE: {
        this.navigateService.endChoice(message.data);
        break;
      }
      case FormMessage.CLOSE: {
        this.navigateService.cancelChoice();
        break;
      }
    }
  }

}