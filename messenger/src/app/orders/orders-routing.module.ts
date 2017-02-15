import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { OrdersComponent } from './components';
import { AuthGuard } from '../login';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: 'orders',
			component: OrdersComponent,
			canActivate: [ AuthGuard ],
		}
	])],
	exports: [ RouterModule ]
})
export class OrdersRoutingModule {}