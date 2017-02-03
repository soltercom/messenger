import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonService } from '../../data';
import { Person, IPersonJSON, IPerson } from '../../../shared/model';
import { NavigateService } from '../../metadata';
import { DetailFieldMetadata } from '../../components';
import { EntityDetail } from '../';

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
export class PersonDetailComponent extends EntityDetail<Person, IPersonJSON> {

	protected data: IPerson;

	metadata: DetailFieldMetadata[] = [
		new DetailFieldMetadata('id'     , 'Код'                 , 'text'    , '', true),
    new DetailFieldMetadata('deleted', 'Удален'              , 'checkbox', '', false),
    new DetailFieldMetadata('client' , 'Клиент'              , 'text'    , '', true),
		new DetailFieldMetadata('name'   , 'Имя'                 , 'text'    , '', false),
    new DetailFieldMetadata('pin'    , 'PIN'                 , 'text'    , '', true),
    new DetailFieldMetadata('admin'  , 'Права администратора', 'checkbox', '', false)
	];

	constructor(protected route: ActivatedRoute,
	            protected personService: PersonService,
	            protected navigateService: NavigateService) {
		super(route, personService, navigateService);
	}

	ngOnInit() {
		super.ngOnInit();
		this.entity = <Person>this.route.snapshot.data['person'];
		this.data = <IPerson>this.entityToData();
	}

}