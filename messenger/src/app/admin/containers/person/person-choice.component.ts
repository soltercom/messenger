import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityList } from '../';
import { Factory } from '../../../shared/factory';
import { ListFieldMetadata } from '../../components';
import { NavigateService } from '../../metadata';
import { Person } from '../../../shared/model';
import { ListFilter } from '../../../shared';

@Component({
  template: `
    <alt-entity-choice
		  [navLinks]="navigateService.navLinks"
		  [title]="'Пользователи (Выбор)'"
			[metadata]="metadata"
			[list]="filteredList"
			[selectedItem]="selectedEntity"
			(message)="onMessage($event)">
    </alt-entity-choice>    
  `
})
export class PersonChoiceComponent extends EntityList {

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