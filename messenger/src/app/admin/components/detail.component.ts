import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { IEntity } from '../../shared/model';
import { DetailFieldMetadata, NavLinkMetadata } from './';
import { FormMessage } from '../../shared';

@Component({
	selector: 'alt-detail',
	host: {
		'(document:keydown.esc)': 'onCancel()',
	},
	template: `
		<md-card>
			<md-card-title>
        <alt-nav-bar [navLinks]="navLinks"></alt-nav-bar>
      </md-card-title>
      <md-card-content style="margin-top: 20px">
      	<div [formGroup]="detailForm">
      		<section *ngFor="let m of metadata" [ngSwitch]="m.type">
			      <md-input-container *ngSwitchCase="'text'">
              <input md-input
                formControlName="{{m.name}}"
                [placeholder]="m.desc"
                [readonly]="m.readonly || !this.editRegime"
                type="{{m.type}}">
            </md-input-container>
			      <md-checkbox *ngSwitchCase="'checkbox'" 
			        formControlName="{{m.name}}"
			        [disabled]="m.readonly || !this.editRegime">{{m.desc}}
		        </md-checkbox>
		        <button md-icon-button md-raised-button *ngIf="m.isRef && editRegime"
              	(click)="onRefboxClick(m)"
              	color="warn">
              <md-icon>edit</md-icon></button>
					</section>  
      	</div>	
      </md-card-content>
			<md-card-actions style="margin-left: 0;">
				<button md-raised-button md-icon-button *ngIf="!editRegime" 
								color="primary"
				        (click)="onEdit()">
					<md-icon>edit</md-icon></button>
				<button md-raised-button *ngIf="editRegime"
								color="primary"
				        (click)="onOK()">ОК</button>
				<button md-raised-button *ngIf="editRegime"
								color="primary"
				        (click)="onSave()">Записать</button>
				<button md-raised-button 
				        (click)="onCancel()">Отмена</button>		
			</md-card-actions>
		</md-card>
		<!--<div class="panel panel-default">
			<div class="panel-heading">
			    <alt-nav-bar [navLinks]="navLinks"></alt-nav-bar>
				<h3 class="panel-title">{{title}}</h3>
			</div>	
			<div class="panel-body">
				<div [formGroup]="detailForm">
					<div *ngFor="let m of metadata">
					  <div [ngSwitch]="m.type">
					    <div *ngSwitchCase="'text'" class="form-group">  
                <label>{{m.desc}}</label>
                <input class="form-control" *ngIf="!m.isRef"
                         type="{{m.type}}" 
                       formControlName="{{m.name}}"
                       placeholder="{{m.placeholder}}" 
                       [attr.readonly]="!editRegime || m.readonly">
                <div class="input-group" *ngIf="m.isRef">
                    <input class="form-control" 
                    	type="{{m.type}}" 
                      formControlName="{{m.name}}" 
                      [attr.readonly]="m.readonly"
                      (click)="onRefboxClick(m)">
                    <span class="input-group-addon"
                      (click)="onRefboxClick(m)">...</span>
                </div>
              </div>
              <div *ngSwitchCase="'checkbox'" class="checkbox">
                <label>
                  <input type="checkbox" 
                         formControlName="{{m.name}}"
                         placeholder="{{m.placeholder}}" 
                         [attr.disabled]="!editRegime || m.readonly"> {{m.desc}}
                </label>  
              </div>
						</div>       	     
					</div>	
				</div>	
			</div>
			<div class="panel-footer">
				<button *ngIf="!editRegime" class="btn btn-primary"
				        (click)="onEdit()">Изменить</button>
				<button *ngIf="editRegime" class="btn btn-primary"
				        (click)="onOK()">ОК</button>
				<button *ngIf="editRegime" class="btn btn-primary"
				        (click)="onSave()">Записать</button>
				<button class="btn btn-default" 
				        (click)="onCancel()">Отмена</button>
			</div>
		</div>-->
	`,
	styles: [`div.input-group {cursor: pointer; user-select: none; }`,
		`md-input-container { width: 50% }`,
		`section { 
			display: flex;
	    align-content: center;
	    align-items: center;
			height: 60px; 
			width: 100%;
	  }`]
})
export class DetailComponent implements OnInit{

	@Input() title: string;
	@Input() editRegime: boolean;
	@Input() metadata: DetailFieldMetadata[] = [];
	@Input() navLinks: NavLinkMetadata[] = [];
	@Input() data: IEntity;
	@Output() message = new EventEmitter();

	private detailForm: FormGroup;

	ngOnInit() {
		this.detailForm = new FormGroup({});
		this.metadata.forEach(m => {
			this.detailForm.addControl(m.name, new FormControl(this.data[m.name]))
		});
	}

	onEdit() {
		this.editRegime = true;
	}

	onOK() {
		this.message.emit({ action: FormMessage.OK, data: this.detailForm.value });
	}

	onSave() {
		this.message.emit({ action: FormMessage.SAVE, data: this.detailForm.value });
	}

	onCancel() {
		this.message.emit({ action: FormMessage.CANCEL });
	}

	onRefboxClick(source: DetailFieldMetadata) {
	  let data = {
	    detailData: this.detailForm.value,
      source:     source,
		  editRegime: this.editRegime
	  };
		this.message.emit({ action: FormMessage.START_CHOICE, data: data });
	}

	test(event: any) {
		console.log('Event: ', event);
	}

}