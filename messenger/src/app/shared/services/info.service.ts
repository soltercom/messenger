import { Component, Injectable, Input } from '@angular/core';
import { MdDialog, MdDialogTitle } from '@angular/material';

export type InfoMessageType = { result: boolean, message?: string }

@Injectable()
export class InfoService {

  constructor(public dialog: MdDialog) {
  }

  message(message: string, action: string) {
    let dialogRef = this.dialog.open(InfoComponent);
    dialogRef.componentInstance.title = action;
    dialogRef.componentInstance.message = message;
  }

}

@Component({
  selector: 'alt-info',
  template: `
    <md-card style="margin: -24px;">
      <md-card-subtitle>{{title}}</md-card-subtitle>
      <md-card-content>{{message}}</md-card-content>
      <md-card-actions>
        <button md-raised-button md-dialog-close
          style="width: 100%">Закрыть</button>
      </md-card-actions>
    </md-card>
  `
})
export class InfoComponent {
  @Input() title: string;
  @Input() message: string;

}