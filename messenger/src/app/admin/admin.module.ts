import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared';
import { ClientService, PersonService, ContactService} from './data';
import { ClientHttpService, PersonHttpService, ContactHttpService } from '../shared/http';
import { ClientResolver, ClientListResolver,
         PersonResolver, PersonListResolver, PersonChoiceResolver,
         ContactResolver, ContactListResolver } from './resolvers';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent,
         ClientListComponent, ClientDetailComponent,
	       PersonListComponent, PersonDetailComponent, PersonChoiceComponent,
         ContactListComponent, ContactDetailComponent } from './containers';
import { ListComponent, DetailComponent, ChoiceComponent,
         NavbarComponent } from './components';
import { InfoComponent } from '../shared';
import { NavigateService } from './metadata';
import { FactoryClient, FactoryPerson, FactoryContact } from '../shared/factory';
import { RepositoryService } from '../shared/repository';
import { AuthGuard, AdminGuard } from '../login';

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		AdminComponent,
    ListComponent,
		DetailComponent,
    ChoiceComponent,
    ClientListComponent,
		ClientDetailComponent,
		PersonListComponent,
		PersonDetailComponent,
    PersonChoiceComponent,
    ContactListComponent,
    ContactDetailComponent,
    NavbarComponent
	],
	entryComponents: [
		InfoComponent
	],
	exports:   [  ],
	providers: [
    NavigateService,
    ClientHttpService,
    PersonHttpService,
    ContactHttpService,
    ClientService,
		ClientResolver,
    ClientListResolver,
		PersonResolver,
    PersonListResolver,
    PersonChoiceResolver,
    ContactResolver,
    ContactListResolver,
    ClientService,
		PersonService,
    ContactService,
    FactoryClient,
    FactoryPerson,
    FactoryContact,
    RepositoryService,
		AuthGuard,
		AdminGuard
	]
})
export class AdminModule { }