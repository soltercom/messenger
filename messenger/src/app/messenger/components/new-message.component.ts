import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../shared/model';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	template: `
		<md-card style="margin: -24px;">
			<md-card-title style="opacity: 0.87;">{{contact.personTo}}</md-card-title>
			<md-card-content>
				<md-input-container [formGroup]="form"
				                    style="width: 100%; font-size: 20px; line-height: 1.5em;">
      		<textarea md-input rows="7" cols="30"
      		          placeholder="Текст нового сообщения"
      		          formControlName="text"></textarea>
    		</md-input-container>
			</md-card-content>
			<md-card-actions>
				<button md-raised-button
								color="primary"
				        (click)="onOK()">Отправить</button>
				<button md-raised-button
				        (click)="onCancel()">Отмена</button>
			</md-card-actions>
		</md-card>	
	`
})
export class NewMessageComponent implements OnInit {

	@Input() contact: Contact;
	private form: FormGroup;

	constructor(private dialogRef: MdDialogRef<NewMessageComponent>){}

	ngOnInit() {
		this.form = new FormGroup({});
		this.form.addControl("text", new FormControl(""));
	}

	onOK() {
		if (this.form.value.text.trim() === '') return;

		this.dialogRef.close({
			contact: this.contact,
			text:    this.form.value.text,
		});
	}

	onCancel() {
		this.dialogRef.close(null);
	}
}