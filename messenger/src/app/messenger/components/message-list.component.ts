import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Message, Person } from '../../shared/model';
import { MomentService } from '../../shared/services';
import { FactoryMessage } from '../../shared/factory';
import { FormMessage, MessageType, ListFilter, FLY_IN_OUT_ANIMATION } from '../../shared';

@Component({
	selector: 'alt-message-list',
	template: `
		<md-card [style.height]="messagesHeight"
		         style="margin: 8px; background-color: #F5F5F5">
			<md-card-title style="margin-bottom: 0; display: flex;">
				<span style="flex-grow: 1">Сообщения</span>
				<span *ngIf="totalNewMessages > 0"
					class="total-new-messages"
				  style="flex-grow: 0"><md-icon>email</md-icon> {{totalNewMessages}}</span>				  
			</md-card-title>
			<md-card-actions>
				<alt-filter [placeholder]="'Поиск сообщений...'"
                    (message)="onFilter($event)"
                    style="padding-left: 16px;"></alt-filter>
			</md-card-actions>
			<md-card-content
			  [style.height]="messagesListHeight"
				style="margin: -16px -16px 0 0; overflow-x: hidden; overflow-y: scroll;">
				<div *ngFor="let message of messageFilter.list" 
				    style="display: flex;"
						[ngClass]="{income: message.isIncome(user), outcome: !message.isIncome(user)}">
					<alt-message [message]="message" 
						           [addressee]="message.getAddressee(user)"
						           [income]="message.isIncome(user)"
						           [date]="momentService.getDate(message.date)"
						           [width]="messageWidth"
						           [@flyInOut]="'in'"
						           (formMessage)="onMessage($event)"></alt-message>
					<button *ngIf="message.isIncome(user) && !message.new" md-mini-fab 
		        class="reply" color="primary"
		        mdTooltip="Ответить" [mdTooltipPosition]="'after'"
		        (click)="onReply(message)">
		        <md-icon>reply</md-icon>
	        </button>	           
				</div>
			</md-card-content>
		</md-card>
	`,
	styles: [
		`.outcome  { justify-content: flex-end; margin-right: 25px; }`,
		`.income { justify-content: flex-start; }`,
		`.total-new-messages {
			color: #fff;
			background-color: #E91E63;
			font-size: 14px;
			border-radius: 6px;
			padding: 6px 12px;
			align-self: center;
			opacity: 0.87;
		}`,
		`.reply {
			align-self: center;
			margin-bottom: 20px;
			margin-left: -15px;
		}`
	],
	animations: FLY_IN_OUT_ANIMATION
})
export class MessageListComponent implements OnInit {

	@Input() messages: Message[];
  @Input() user: Person;
	@Input() totalNewMessages: number;
	@Output() message = new EventEmitter();

	private messageFilter: ListFilter<Message>;

	private messagesHeight: string = '200px';
	private messagesListHeight: string = '150px';
	private messageWidth: string = '0';
	private window: any = window;

	constructor(private momentService: MomentService) {
		this.messageFilter = new ListFilter<Message>(FactoryMessage.filterFn, FactoryMessage.sortFn);
	}

	ngOnInit() {
		this.messageFilter.list = this.messages;
		this.window.addEventListener("orientationchange", () =>
				this.setSizes(this.window.innerWidth, this.window.innerHeight)
			, false);
		window.addEventListener("resize", () =>
				this.setSizes(this.window.innerWidth, this.window.innerHeight)
			, false);
		this.setSizes(this.window.innerWidth, this.window.innerHeight);
	}

	private setSizes(width: number, height: number) {
		this.messagesHeight     = `${height - 130}px`;
		this.messagesListHeight = `${height - 250}px`;
		this.messageWidth       = `${Math.ceil(0.8*0.66*width)}`;
	}

	onFilter(filter: string) {
		this.messageFilter.filter = filter;
	}

	onMessage(message: MessageType) {
		this.message.emit(message);
	}

	onReply(message: Message) {
		this.message.emit({ action: FormMessage.REPLY, data: message.contact.cross });
	}

}