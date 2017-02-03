import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../../data';
import { Contact, IContactJSON, IContact } from '../../../shared/model';
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
export class ContactDetailComponent extends EntityDetail<Contact, IContactJSON> {

  protected entity: Contact;
  protected data: IContact;

  protected metadata: DetailFieldMetadata[] = [
    new DetailFieldMetadata('id'        , 'Код'    , 'text'    , '', true),
    new DetailFieldMetadata('deleted'   , 'Удален' , 'checkbox', '', false),
    new DetailFieldMetadata('personFrom', 'от кого', 'text'    , '', true),
    new DetailFieldMetadata('personTo'  , 'кому'   , 'text'    , 'people/choice', true)
  ];

  constructor(protected route: ActivatedRoute,
              protected contactService: ContactService,
              protected navigateService: NavigateService) {
    super(route, contactService, navigateService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.entity = <Contact>this.route.snapshot.data['contact'];
    this.data = <IContact>this.entityToData();

    let cache = this.navigateService.getCache();
    if (cache) {
      this.data.deleted  = cache.deleted;
      this.data.personTo = cache.personTo;
    }
  }

}