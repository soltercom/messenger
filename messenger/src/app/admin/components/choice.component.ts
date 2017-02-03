import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Entity } from '../../shared/model';
import { ListFieldMetadata, NavLinkMetadata } from './';
import { FormMessage } from '../../shared';

@Component({
  selector: 'alt-entity-choice',
  template: `
    <md-card>
      <md-card-title>
        <alt-nav-bar [navLinks]="navLinks"></alt-nav-bar>
      </md-card-title>
      <md-card-actions style="margin-left: 0;">
        <button md-raised-button color="primary"
          (click)="selectItem(selectedItem)">
          Выбрать
        </button>
        <button md-icon-button md-raised-button 
          (click)="close()">
          <md-icon>close</md-icon>
        </button>
        <alt-filter [placeholder]="'Поиск...'"
                    (message)="onFilter($event)"></alt-filter>
      </md-card-actions>
      <md-card-content>
        <md-list>
          <md-list-item>
            <div *ngFor="let m of metadata" 
                 class="cell"><b>{{m.desc}}</b></div> 
          </md-list-item>
          <md-divider></md-divider>  
        </md-list>
        <md-list>
          <div *ngFor="let item of list">
            <md-list-item class="row"
              [ngClass]="{ selected: item.isEqual(selectedItem), deleted: item.deleted }"
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
        <h3>
            {{title}}
          <button (click)="close()" type="button" class="close pull-right"><span>&times;</span></button>
        </h3>
      </div>    
      <div class="panel-body">
        <alt-filter [placeholder]="'Поиск...'"
                    (message)="onFilter($event)"></alt-filter>
        <div [style.height]="contactsHeight" style="overflow-y: scroll;">
          <table class="table table-hover">
            <thead><tr><th *ngFor="let m of metadata">{{m.desc}}</th></tr></thead>
              <tbody>
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
export class ChoiceComponent {

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
    //this.contactsHeight = `${windowHeight - 270}px`;
  }

  selectItem(entity: Entity) {
    if (entity.isEqual(this.selectedItem))
      this.message.emit({ action: FormMessage.CHOICE, data: this.selectedItem });
    else
      this.message.emit({ action: FormMessage.SELECT, data: entity });
  }

  close() {
    this.message.emit({ action: FormMessage.CLOSE });
  }

  onFilter(filter: string) {
    this.message.emit({ action: FormMessage.FILTER, data: filter});
  }

}