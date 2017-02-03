import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IEntityJSON } from '../model';
import { API_PATH } from '../';

export abstract class HttpService<T extends IEntityJSON> {

  protected API_PATH: string = API_PATH;
  protected requestOptions: RequestOptions;

  protected get PATH() { return `${this.API_PATH}/${this.entityPath}`; }

  constructor(protected http: Http,
              protected entityPath: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.requestOptions = new RequestOptions({ headers: headers });
  }

  retrieve(): Observable<T[]> {
    return this.http.get(this.PATH)
      .map(res => res.json())
      .catch(this.handleError);
  }

  add(data: T): Observable<T> {
    return this.http.post(
      this.PATH,
      JSON.stringify(data),
      this.requestOptions
    ).map(res => res.json())
      .mergeMap(res => Observable.of(res))
      .catch(this.handleError);
  }

  update(data: T): Observable<T> {
    return this.http.put(
      `${this.PATH}/${data.id}`,
      JSON.stringify(data),
      this.requestOptions
    ).mergeMap(res => Observable.of(data))
      .catch(this.handleError);
  }

  delete(data: T): Observable<T> {
    return this.http.delete(
      `${this.PATH}/${data.id}`,
      this.requestOptions
    ).mergeMap(res => Observable.of(data))
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.log('HTTP ERROR: ', error);
    return Observable.throw('HTTP ERROR');
  }

}