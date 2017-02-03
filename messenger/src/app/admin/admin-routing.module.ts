import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { AdminComponent,
	       ClientListComponent, ClientDetailComponent,
	       PersonListComponent, PersonDetailComponent, PersonChoiceComponent,
         ContactListComponent, ContactDetailComponent } from './containers';
import { ClientResolver, ClientListResolver,
         PersonResolver, PersonListResolver, PersonChoiceResolver,
         ContactResolver, ContactListResolver } from './resolvers';
import { AuthGuard, AdminGuard } from '../login';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'admin',
			component: AdminComponent,
			canActivate: [ AuthGuard, AdminGuard ],
			children: [
				{
					path: 'clients',
					component: ClientListComponent,
          resolve: {
            list: ClientListResolver
          }
				},
				{
					path: 'clients/:client',
					component: ClientDetailComponent,
					resolve: {
						client: ClientResolver
					}
				},
				{
					path: 'clients/:client/people',
					component: PersonListComponent,
					resolve: {
            client: ClientResolver,
            list: PersonListResolver
					}
				},
				{
					path: 'clients/:client/people/:person',
					component: PersonDetailComponent,
					resolve: {
            client: ClientResolver,
						person: PersonResolver
					}
				},
        {
          path: 'clients/:client/people/:person/contacts',
          component: ContactListComponent,
          resolve: {
            client: ClientResolver,
            person: PersonResolver,
            list: ContactListResolver
          }
        },
        {
          path: 'clients/:client/people/:person/contacts/:contact',
          component: ContactDetailComponent,
          resolve: {
            client: ClientResolver,
            person: PersonResolver,
            contact: ContactResolver
          }
        },
        {
          path: 'people/choice',
          component: PersonChoiceComponent,
          resolve: {
            list: PersonChoiceResolver
          }
        },
				{
					path: '**',
					redirectTo: 'clients',
					pathMatch: 'full'
				}
			]
		}
	])],
	exports: [RouterModule]
})
export class AdminRoutingModule {}