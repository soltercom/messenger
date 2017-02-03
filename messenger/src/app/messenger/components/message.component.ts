import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message, Person } from '../../shared/model';
import { FormMessage } from '../../shared';

@Component({
	selector: 'alt-message',
	template: `
		<div style="display: inline-block; margin-bottom: 20px;"
				 [ngClass]="{income: income, outcome: !income, new: message.new}"
				 [style.maxWidth]="width">
			<div class="title" 
			     style="display: flex; padding: 8px 16px; 
			     border-radius: 4px 4px 0 0;">
				<md-icon *ngIf="income" class="o087">message</md-icon>
				<md-icon *ngIf="!income" class="o087">comment</md-icon>
				<div style="align-self: center; margin-left: 6px;">
					{{addressee.desc}}
				</div>	
			</div>
			<div class="content" style="padding: 16px;"
					[style.maxWidth]="width">
				<textarea *ngIf="!(income && message.new)"
									md-input 
				          [attr.rows]="rows" 
				          [attr.cols]="cols"
      		        [value]="message.text"
      		        [style.maxWidth]="maxWidthTextArea"
      		        disabled></textarea>
      	<button  *ngIf="income && message.new"
      	         md-raised-button color="warn"
      	         (click)="readMessage(message)">Прочитать...</button>
			</div>
			<div class="footer" 
					 style="display: flex; justify-content: flex-end; 
				       font-size: 10px; padding: 8px; 
				       border-radius: 0 0 4px 4px;">
				<md-icon 
					style="width: 14px; height: 14px; font-size: 14px; opacity: 0.5;">
					access_time</md-icon>
				<div style="align-self: center; padding-left: 4px; opacity: 0.7;">{{date}}</div>	
			</div>
		</div>
	`,
	styles: [
		`.o087 {
			opacity: 0.87;
		}`,
		`.income>.title, .income>.footer {
			color: #fff;
			background-color: #303F9F;
		}`,
		`.outcome>.title, .outcome>.footer {
			color: #fff;
			background-color: #303F9F;
		}`,
		`.income>.content {
			color: #000;
			background-color: #F5F5F5;
		}`,
		`.outcome>.content {
			color: #000;
			background-color: #8C9EFF;		
		}`,
		`.new {
			padding: 4px;
			border: 3px solid;
			border-radius: 4px;
			border-color: #F44336
		}`,
		`.content {
			border-left:  1px solid rgba(48, 63, 159, 0.38);
			border-right: 1px solid rgba(48, 63, 159, 0.38);
		}
		`
	]
})
export class MessageComponent {

	@Input() message: Message;
	@Input() addressee: Person;
  @Input() income: boolean;
	@Input() date: string;
	@Input() width: string;
	@Output() formMessage = new EventEmitter();

	constructor() {}

	get rows(): string {
		let arr = this.message.text.split('\n');
		let rows = arr.reduce((rows: number, str: string) => rows + Math.ceil(str.length/80), 0);
		return `${rows}`;
	}

	get cols(): string {
		let arr = this.message.text.split('\n').map(str => str.length);
		return `${Math.max(30, ...arr)}`;
	}

	get maxWidth(): string {
		return `${this.width}px`;
	}

	get maxWidthTextArea(): string {
		let size: number = Number.parseInt(this.width)-16;
		return `${size}px`;
	}

	readMessage(message: Message) {
		this.formMessage.emit({ action: FormMessage.READ, data: message });
	}

}
