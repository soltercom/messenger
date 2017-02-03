import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { InfoComponent } from './services';
import { MenuComponent, FilterComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		[MaterialModule.forRoot()],
		ReactiveFormsModule
	],
	exports: [
		MenuComponent,
		FilterComponent,
		InfoComponent
	],
	declarations: [
		MenuComponent,
		FilterComponent,
		InfoComponent
	],
	providers: [
	]
})
export class SharedModule { }