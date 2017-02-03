import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent, ContactsComponent,
         NewMessageComponent, MessageListComponent,
         MessageComponent } from './components';
import { MessengerService } from './services';
import { ContactsResolver, MessagesResolver } from './resolvers';
import { MessageHttpService } from '../shared/http';
import { FactoryMessage } from '../shared/factory';
import { MomentService, SocketService } from '../shared/services';

@NgModule({
  imports: [
    CommonModule,
    MessengerRoutingModule,
    ReactiveFormsModule,
    [MaterialModule.forRoot()],
    SharedModule
  ],
  exports: [],
  declarations: [
    MessengerComponent,
    ContactsComponent,
    NewMessageComponent,
    MessageListComponent,
    MessageComponent
  ],
  entryComponents: [
    NewMessageComponent
  ],
  providers: [
    MessengerService,
    ContactsResolver,
    MessagesResolver,
    MessageHttpService,
    FactoryMessage,
    MomentService,
    SocketService
  ],
})
export class MessengerModule { }
