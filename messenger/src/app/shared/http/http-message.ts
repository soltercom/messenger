import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { IMessageJSON } from '../model';

@Injectable()
export class MessageHttpService extends HttpService<IMessageJSON> {

	constructor(protected http: Http) {
		super(http, 'messages');
	}

	getPersonMessages(id: string): Observable<any> {
		return this.http.get(`${this.PATH}/person/${id}`)
			.map(res => res.json())
      .catch(this.handleError);
	}

}