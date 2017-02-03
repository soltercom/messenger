import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { AuthGuard } from '../login';
import { MessengerComponent } from './components';
import { ContactsResolver, MessagesResolver } from './resolvers';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'messenger',
      component: MessengerComponent,
      canActivate: [ AuthGuard ],
      resolve: {
        contacts: ContactsResolver,
        messages: MessagesResolver
      }
    }
  ])],
  exports: [RouterModule]
})
export class MessengerRoutingModule {}