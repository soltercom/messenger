import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Factory } from '../../../shared/factory'
import { EntityList } from '../';
import { Client } from '../../../shared/model';
import { ListFieldMetadata } from '../../components';
import { NavigateService } from '../../metadata';
import { ListFilter } from '../../../shared';

@Component({
  template: `
    <alt-entity-list
		  [navLinks]="navigateService.navLinks"
		  [title]="'Клиенты'"
			[metadata]="metadata"
			[list]="filteredList"
			[selectedItem]="selectedEntity"
			(message)="onMessage($event)">
    </alt-entity-list>    
  `
})
export class ClientListComponent extends EntityList implements OnInit {

  private metadata: ListFieldMetadata[] = [
    new ListFieldMetadata('name', 'Наименование')
  ];

  constructor(protected route: ActivatedRoute,
              protected navigateService: NavigateService){
    super(route, navigateService,
          new ListFilter<Client>(Factory.filterFn, Factory.sortFn));
  }

}