import { Injectable } from '@angular/core';
import { Router, UrlSegment, ActivatedRouteSnapshot, ActivatedRoute, Route } from '@angular/router';
import { List }       from 'immutable';

import { Entity } from '../../shared/model';
import { NavLinkMetadata } from '../components';

@Injectable()
export class NavigateService {

  private _navLinks: List<NavLinkMetadata> = List<NavLinkMetadata>();
  private _cache: any;

  constructor(private router: Router) {}

  get navLinks() {
    return this._navLinks;
  }

  private getUrl(level: number): string {
    return Array.from('1111111111111111'.substr(0, level))
      .reduce(item => item.concat('../'), '');
  }

  update(route: ActivatedRouteSnapshot) {
    this._navLinks = this._navLinks.clear();
    let pathArray = route.routeConfig.path.split('/');
    let size = pathArray.length-1;
    pathArray.forEach((path, index) => {
      let url = this.getUrl(size-index);
      if (path === 'clients')
        this._navLinks = this._navLinks.push(new NavLinkMetadata(url, 'Клиенты'));
      if (path === ':client')
        this._navLinks = this._navLinks.push(new NavLinkMetadata(url,
          Entity.isNewId(route.params['client']) ? 'Новый': route.data['client']));
      if (path === 'people')
        this._navLinks = this._navLinks.push(new NavLinkMetadata(url, 'Пользователи'));
      if (path === ':person')
        this._navLinks = this._navLinks.push(new NavLinkMetadata(url,
          Entity.isNewId(route.params['person']) ? 'Новый': route.data['person']));
      if (path === 'contacts')
        this._navLinks = this._navLinks.push(new NavLinkMetadata(url, 'Контакты'));
      if (path === ':contact')
        this._navLinks = this._navLinks.push(new NavLinkMetadata(url,
          Entity.isNewId(route.params['contact']) ? 'Новый': route.data['contact']));
      if (path === 'choice') {
        let _navLink = this._navLinks.last();
        this._navLinks = this._navLinks.pop().push(new NavLinkMetadata('', `${_navLink.title} (Выбор)`));
      }
    });
    if (!Entity.isNewId(route.url[size].path)) {
      if (size > -1) {
        let path = pathArray[size];
        if (path === ':client')
          this._navLinks = this._navLinks.push(new NavLinkMetadata('./people', 'Пользователи'));
        if (path === ':person')
          this._navLinks = this._navLinks.push(new NavLinkMetadata('./contacts', 'Контакты'));
      }
    }
  }

  toList(route: ActivatedRouteSnapshot) {
    let url = route.url;
    url.pop();
    this.router.navigate([
      'admin',
      ...url.map(segment => segment.path)
    ]);
  }

  toDetail(route: ActivatedRouteSnapshot, id: string) {
    this.router.navigate([
      'admin',
      ...route.url.map(segment => segment.path),
      id
    ]);
  }

  toDetail2(route: ActivatedRouteSnapshot, id: string) {
    let url = route.url;
    url.pop();
    let newUrl = ['admin', ...url.map(segment => segment.path), id];
    this.router.navigate(['admin']).then(() =>
      this.router.navigate(newUrl));
  }

  startChoice(route: ActivatedRouteSnapshot, data: any) {
    data.url = [
      'admin',
      ...route.url.map(segment => segment.path)
    ];
    this._cache = data;
    this.router.navigate([
      'admin',
      ...data.source.ref.split('/')
    ]);
  }

  endChoice(data: any) {
    this._cache.detailData[this._cache.source.name] = data;
    this.router.navigate(this._cache.url);
  }

  cancelChoice() {
    this.router.navigate(this._cache.url);
  }

  getCache() {
    if (!this._cache) return null;
    let data = this._cache.detailData;
    this._cache = null;
    return data;
  }

}