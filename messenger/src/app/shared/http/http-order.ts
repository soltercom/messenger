import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { IOrderJSON } from '../model';

@Injectable()
export class OrderHttpService extends HttpService<IOrderJSON> {

	constructor(protected http: Http) {
		super(http, 'orders');
	}

	getPersonOrders(id: string): Observable<any> {
		return this.http.get(`${this.PATH}/person/${id}`)
			.map(res => res.json())
			.catch(this.handleError);
	}

	getPersonContacts(id: string): Observable<any> {
		return this.http.get(`${this.PATH}/contacts/${id}`)
			.map(res => res.json())
			.catch(this.handleError);
	}

}