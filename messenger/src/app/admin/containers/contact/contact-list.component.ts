import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityList } from '../';
import { Factory } from '../../../shared/factory';
import { ListFieldMetadata } from '../../components';
import { NavigateService } from '../../metadata';
import { ListFilter } from '../../../shared';
import { Contact } from '../../../shared/model';

@Component({
  template: `
    <alt-entity-list
		  [navLinks]="navigateService.navLinks"
		  [title]="'Контакты'"
			[metadata]="metadata"
			[list]="filteredList"
			[selectedItem]="selectedEntity"
			(message)="onMessage($event)">
    </alt-entity-list>    
  `
})
export class ContactListComponent extends EntityList implements OnInit {

  private metadata: ListFieldMetadata[] = [
    new ListFieldMetadata('personFrom', 'От кого'),
    new ListFieldMetadata('personTo'  , 'Кому')
  ];

  constructor(protected route: ActivatedRoute,
              protected navigateService: NavigateService){
    super(route, navigateService,
      new ListFilter<Contact>(Factory.filterFn, Factory.sortFn));
  }

}