import { Component, Input, Output, EventEmitter } from '@angular/core';

export class MenuItem {
	constructor (private _action: string,
	             private _icon: string,
	             private _desc: string,
	             private _disabled: boolean) {}

	get action()   { return this._action; }
	get icon()     { return this._icon; }
	get desc()     { return this._desc; }
	get disabled() { return this._disabled; }

}

@Component({
	selector: 'alt-menu',
	template: `
		<button md-icon-button [mdMenuTriggerFor]="menu">
		  <md-icon>{{menuIcon}}</md-icon>
		</button>
		<md-menu #menu="mdMenu">
			<button md-menu-item *ngFor="let m of menuItems"
			  (click)="select(m.action)"
			  [attr.disabled]="m.disabled">
    		<md-icon>{{m.icon}}</md-icon>
    		<span>{{m.desc}}</span>
  		</button>	
		</md-menu>				
	`
})
export class MenuComponent {

	@Input()  menuIcon: string;
	@Input()  menuItems: MenuItem[] = [];
	@Output() menuMessage = new EventEmitter();

	select(action: string) {
		this.menuMessage.emit(action);
	}

}