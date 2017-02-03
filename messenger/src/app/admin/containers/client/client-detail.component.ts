import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClientService } from '../../data';
import { Client, IClientJSON, IClient } from '../../../shared/model';
import { NavigateService } from '../../metadata';
import { DetailFieldMetadata } from '../../components';
import { EntityDetail } from '../';
import { FormMessage } from '../../../shared';

@Component({
	template: `
		<alt-detail
			[navLinks]="navigateService.navLinks"
			[editRegime]="editRegime"
			[metadata]="metadata"
			[data]="data"
			[title]="entity.desc"
			(message)="onMessage($event)">
		</alt-detail>			
	`
})
export class ClientDetailComponent extends EntityDetail<Client, IClientJSON> {

	protected data: IClient;

	metadata: DetailFieldMetadata[] = [
		new DetailFieldMetadata('id'     , 'Код'         , 'text'    , '', true),
    new DetailFieldMetadata('deleted', 'Удален'      , 'checkbox', '', false),
		new DetailFieldMetadata('name'   , 'Наименование', 'text'    , '', false)
	];

  constructor(protected route: ActivatedRoute,
              protected clientService: ClientService,
              protected navigateService: NavigateService) {
    super(route, clientService, navigateService);
  }

	ngOnInit() {
  	super.ngOnInit();
		this.entity = <Client>this.route.snapshot.data['client'];
		this.data   = <IClient>this.entityToData();
	}

}