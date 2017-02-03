import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Entity } from '../../shared/model';
import { ListFieldMetadata, NavLinkMetadata } from './';
import { FormMessage } from '../../shared';

@Component({
  selector: 'alt-entity-list',
  template: `
    <md-card>
      <md-card-title>
        <alt-nav-bar [navLinks]="navLinks"></alt-nav-bar>
      </md-card-title>
      <md-card-actions style="margin-left: 0;">
        <button md-icon-button md-raised-button (click)="addItem()">
          <md-icon>add</md-icon>
        </button>
        <button md-icon-button md-raised-button (click)="editItem()">
          <md-icon>edit</md-icon>
        </button>
        <alt-filter [placeholder]="'Поиск...'"
                    (message)="onFilter($event)"></alt-filter>
      </md-card-actions>
      <md-card-content>
        <md-list style="margin-top: -16px;">
          <md-list-item>
            <div *ngFor="let m of metadata" 
                 class="cell"><b>{{m.desc}}</b></div> 
          </md-list-item>
          <md-divider></md-divider>  
        </md-list>
        <md-list>
          <div *ngFor="let item of list">
            <md-list-item class="row"
              [ngClass]="{selected: item.isEqual(selectedItem), deleted: item.deleted}"
              (click)="selectItem(item)">
              <div *ngFor="let m of metadata" 
                 class="cell">{{item[m.name]}}</div> 
            </md-list-item>
            <md-divider></md-divider>
          </div>
        </md-list>
      </md-card-content>
    </md-card>
    <!--<div class="panel panel-default">
      <div class="panel-heading">
        <alt-nav-bar [navLinks]="navLinks"></alt-nav-bar>
        <h3>{{title}}</h3>
        <button (click)="addItem()" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>
        <button (click)="editItem()" class="btn btn-default"><span class="glyphicon glyphicon-pencil"></span></button>
      </div>    
      <div class="panel-body">
        <alt-filter [placeholder]="'Поиск...'"
                    (message)="onFilter($event)"></alt-filter>
        <div [style.height]="contactsHeight" style="overflow-y: scroll;">
          <table class="table table-hover">
            <thead><tr><th *ngFor="let m of metadata">{{m.desc}}</th></tr></thead>
              <tbody [style.height]="contactsHeight" style="overflow-y: scroll;">
                <tr *ngFor="let item of list"
                    [ngClass]="{info: item.isEqual(selectedItem), deleted: item.deleted}"
                    (click)="selectItem(item)">
                  <td *ngFor="let m of metadata">
                      {{item[m.name]}}
                  </td>
                </tr>
              </tbody>
          </table>	
        </div>
      </div>
	</div>-->	
    `,
  styles: [
    `.deleted { text-decoration: line-through }`,
    `.row:hover { background-color: #eee; cursor: pointer;  user-select: none; }`,
    `.selected { background-color: #3f51b5; color: white; font-weight: bold; }`,
    `.selected:hover { background-color: #3f51b5; }`,
    `.cell { width: 33%; }`
  ]
})
export class ListComponent implements OnInit {

  @Input() metadata: ListFieldMetadata[] = [];
  @Input() navLinks: NavLinkMetadata[];
  @Input() title: string;
  @Input() list: Entity[];
  @Input() selectedItem: Entity;
  @Output() message = new EventEmitter();

  private contactsHeight: string = '200px';
  private window: any = window;

  ngOnInit() {
    /*this.window.addEventListener("orientationchange", () =>
        this.setContactsHeight(this.window.innerHeight)
      , false);
    window.addEventListener("resize", () =>
        this.setContactsHeight(this.window.innerHeight)
      , false);
    this.setContactsHeight(this.window.innerHeight);*/
  }

  private setContactsHeight(windowHeight: number) {
    /*this.contactsHeight = `${windowHeight - 300}px`;*/
  }

  addItem() {
    this.message.emit({ action: FormMessage.ADD });
  }

  editItem() {
    if (this.selectedItem)
      this.message.emit({ action: FormMessage.EDIT, data: this.selectedItem });
  }

  selectItem(entity: Entity) {
    if (entity.isEqual(this.selectedItem))
      this.editItem();
    else
      this.message.emit({ action: FormMessage.SELECT, data: entity });
  }

  onFilter(filter: string) {
    this.message.emit({ action: FormMessage.FILTER, data: filter});
  }

}