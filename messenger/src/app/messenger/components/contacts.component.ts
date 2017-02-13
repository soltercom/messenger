import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FLY_IN_OUT_ANIMATION } from '../../shared';

import { Contact } from '../../shared/model';
import { FormMessage, ListFilter } from '../../shared';
import { FactoryContact } from '../../shared/factory';

@Component({
	selector: 'alt-contacts',
	template: `
		<md-card [style.height]="contactsHeight"
		         style="margin: 8px; background-color: #F5F5F5">
			<md-card-title style="margin-bottom: 0;">Адресная книга</md-card-title>
			<md-card-actions>
				<alt-filter [placeholder]="'Поиск контактов...'"
                    (message)="onFilter($event)"
                    style="padding-left: 16px;"></alt-filter>
			</md-card-actions>
			<md-card-content style="margin-top: -16px;">
				<md-list [style.height]="contactsListHeight" 
				         style="overflow-x: hidden; overflow-y: scroll;">
					<div *ngFor="let contact of contactFilter.list">
						<md-list-item class="row"
												[@flyInOut]="'in'"
					              (click)="select(contact)"
					              [ngClass]="{selected: contact.isEqual(selectedContact)}">
		          <md-icon [ngClass]="{ online: isOnline(contact), offline: !isOnline(contact) }"
		                   md-list-avatar>face</md-icon>
		          <h4 md-line>{{contact?.personTo?.name}}</h4>
		          <h4 md-line style="opacity: 0.54;">{{contact?.personTo?.client?.name}}</h4>
		          <h6 *ngIf="isPrinted(contact)" class="printed">Печатает...</h6>
		        </md-list-item>
		        <md-divider></md-divider>
		      </div>	
				</md-list>
			</md-card-content>
		</md-card>				
	`,
	styles: [
		`.row:hover { background-color: #C5CAE9; cursor: pointer;  user-select: none; }`,
		`.selected { background-color: #3f51b5; color: white; font-weight: bold; }`,
		`.selected:hover { background-color: #3f51b5; }`,
		`.printed { color: #c5cae9 }`,
		`md-icon.online  { opacity: 0.54; }`,
		`md-icon.offline { opacity: 0.12; }`
	],
	animations: FLY_IN_OUT_ANIMATION
})
export class ContactsComponent implements OnInit {

	@Input() contacts: Contact[];
	@Input() selectedContact: Contact;
	@Input() onlinePeople: string[];
	@Input() printedPeople: string[];
	@Output() message = new EventEmitter();

	private contactFilter: ListFilter<Contact>;

	private contactsHeight: string = '200px';
	private contactsListHeight: string = '150px';
	private window: any = window;

	constructor() {
		this.contactFilter = new ListFilter<Contact>(FactoryContact.filterFn, FactoryContact.sortFn);
	}

	ngOnInit() {
		this.contactFilter.list = this.contacts;
		this.window.addEventListener("orientationchange", () =>
				this.setContactsHeight(this.window.innerHeight)
			, false);
		window.addEventListener("resize", () =>
				this.setContactsHeight(this.window.innerHeight)
			, false);
		this.setContactsHeight(this.window.innerHeight);
	}

	private setContactsHeight(windowHeight: number) {
		this.contactsHeight     = `${windowHeight - 130}px`;
		this.contactsListHeight = `${windowHeight - 250}px`;
	}

	select(contact: Contact) {
		this.message.emit({ action: FormMessage.SELECT, data: contact });
	}

	onFilter(filter: string) {
		this.contactFilter.filter = filter;
	}

	isOnline(contact: Contact): boolean {
		return this.onlinePeople.indexOf(contact.personTo.id) > -1;
	}

	isPrinted(contact: Contact) {
		return this.printedPeople.indexOf(contact.personTo.id) > -1;
	}

}