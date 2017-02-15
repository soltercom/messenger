import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		[MaterialModule.forRoot()],
		OrdersRoutingModule,
	],
	exports: [],
	declarations: [
		OrdersComponent
	],
	providers: [
	],
})
export class OrdersModule { }
