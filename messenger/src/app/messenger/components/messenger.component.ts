import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Person, Contact, IMessageJSON, Message, Entity } from '../../shared/model';
import { FormMessage, MessageType } from '../../shared';
import { NewMessageComponent } from "./";
import { MessageHttpService } from '../../shared/http';
import { FactoryMessage, FactoryContact, Factory } from '../../shared/factory';
import { InfoService, SocketService } from '../../shared';
import { LoginService } from '../../login';

@Component({
	template: `
		<div style="display: flex;">
			<div style="width: 33%">
				<alt-contacts [contacts]="contacts"
				              [selectedContact]="selectedContact"
				              [onlinePeople]="onlinePeople"
				              (message)="onMessage($event)"></alt-contacts>
			</div>
			<div style="width: 67%">
				<alt-message-list [messages]="messages"
				                  [user]="loginService.user"
				                  [totalNewMessages]="totalNewMessages"
				                  (message)="onMessage($event)"></alt-message-list>
			</div>
		</div>
	`,
	styles: [
		`.alt-col {
			width: 33%;
		}`
	]
})
export class MessengerComponent implements OnInit, OnDestroy {

	private _contacts: Contact[] = [];
	private _selectedContact: Contact;
	private _messages: Message[] = [];
	private _onlinePeople: string[] = [];
	private _totalNewMessages: number = 0;

	private socketSub$: Subject<MessageType>;

	get contacts() { return this._contacts; }
	get selectedContact() { return this._selectedContact; }
	get personTo(): Person {
		return this._selectedContact ? this._selectedContact.personTo: null;
	}
	get messages()     { return this._messages; }
	get onlinePeople() { return this._onlinePeople; }
	get totalNewMessages() { return this._totalNewMessages; }

	constructor(private route: ActivatedRoute,
	            private dialog: MdDialog,
	            private loginService: LoginService,
	            private messageHttpService: MessageHttpService,
	            private factoryMessage: FactoryMessage,
	            private factoryContact: FactoryContact,
	            private infoService: InfoService,
	            private socketService: SocketService) {}

	ngOnInit() {
		this.route.data.forEach((data: any) => {
			this._contacts = data.contacts;
			this._messages = data.messages;
			this.sumNewMessages();
		});
		this.socketSub$ = this.socketService.listen();
		this.socketSub$.subscribe(message => this.onMessage(message));
	}

	ngOnDestroy() {
		this.socketSub$.complete();
	}

	onMessage(message: MessageType) {
		switch(message.action) {
			case FormMessage.SELECT: {
				this._selectedContact = message.data;
				this.openNewMessage();
				break;
			}
			case FormMessage.REPLY: {
				this._selectedContact = this.factoryContact.get(message.data);
				this.openNewMessage();
				break;
			}
			case 'ONLINE_PEOPLE': {
				this._onlinePeople = message.data;
				break;
			}
			case 'NEW_MESSAGE': {
				this._messages.unshift(this.factoryMessage.create(message.data));
				this.sumNewMessages();
				break;
			}
			case 'READ_OUTCOME_MESSAGE': {
				this.factoryMessage.get(message.data.id)
					.update({new: message.data.new});
				break;
			}
			case FormMessage.READ: {
				let readMessage = message.data.clone().update({new: false});
				this.updateMessage(readMessage)
					.map(msg => this.factoryMessage.update(msg))
					.subscribe(() => {
						message.data.update({new: false});
						this.socketService.readNewMessage(message.data);
						this.sumNewMessages();
					});
				break;
			}
		}
	}

	openNewMessage() {
		let dialogRef = this.dialog.open(NewMessageComponent, { disableClose: true });
		dialogRef.componentInstance.contact = this.selectedContact;
		dialogRef.afterClosed().subscribe(data => {
			if (data) this.sendMessage(data);
			this._selectedContact = null;
		});
	}

	sendMessage(data: {contact: Contact, text: string}) {
		this.addMessage(this.factoryMessage
			.createNew(data.contact)
			.update({
				text: data.text,
				id:   Factory.createId()
			})
		).do(message => this.socketService.sendNewMessage(message))
		.subscribe(message => this._messages.unshift(message));
	}

	addMessage(message: Message): Observable<Message> {
		return this.messageHttpService.add(<IMessageJSON>message.toServer())
			.map(entity => this.factoryMessage.create(entity));
	}

	updateMessage(message: Message): Observable<Message> {
		return this.messageHttpService.update(<IMessageJSON>message.toServer())
			.map(entity => this.factoryMessage.create(entity));
	}

	sumNewMessages() {
		this._totalNewMessages = this._messages
			.filter(msg => msg.new && msg.isIncome(this.loginService.user)).length;
		window.postMessage({'totalNewMessages': this.totalNewMessages}, "*");
	}

}