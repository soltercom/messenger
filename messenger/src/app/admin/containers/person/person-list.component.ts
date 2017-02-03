import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityList } from '../';
import { Factory } from '../../../shared/factory';
import { Person } from '../../../shared/model';
import { ListFieldMetadata } from '../../components';
import { NavigateService } from '../../metadata';
import { ListFilter } from '../../../shared';

@Component({
  template: `
    <alt-entity-list
		  [navLinks]="navigateService.navLinks"
		  [title]="'Пользователи'"
			[metadata]="metadata"
			[list]="filteredList"
			[selectedItem]="selectedEntity"
			(message)="onMessage($event)">
    </alt-entity-list>    
  `
})
export class PersonListComponent extends EntityList {

  private metadata: ListFieldMetadata[] = [
    new ListFieldMetadata('name', 'Имя'),
    new ListFieldMetadata('client', 'Клиент')
  ];

  constructor(protected route: ActivatedRoute,
              protected navigateService: NavigateService){
    super(route, navigateService,
      new ListFilter<Person>(Factory.filterFn, Factory.sortFn));
  }

}