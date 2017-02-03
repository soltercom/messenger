import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services';

@Component({
  template: `
    <md-card>
      <md-card-content>
        <div [formGroup]="detailForm">
          <md-input-container style="font-size: 22px;">
              <input md-input
                formControlName="pin"
                [placeholder]="'Введите PIN-код'">
            </md-input-container>
        </div>
      </md-card-content>
      <md-card-actions>
        <button md-raised-button
								color="primary"
				        (click)="onOK()">ОК</button>
        <button md-raised-button
				        (click)="onCancel()">Отмена</button>
      </md-card-actions>
    </md-card>
    <!--<div class="panel panel-info">
      <div class="panel-heading">Введите PIN-код</div>
      <div class="panel-body">
        <div [formGroup]="detailForm">
          <div class="form-group">
            <label>PIN-код</label>
            <input class="form-control" 
                   type="text" 
						       formControlName="pin">
          </div>
        </div>
      </div>
      <div class="panel-footer">
				<button class="btn btn-primary"
				        (click)="onOK()">ОК</button>
				<button class="btn btn-default" 
				        (click)="onCancel()">Отмена</button>
			</div>
    </div>-->
  `
})
export class LoginComponent implements OnInit {

  private detailForm: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit() {
    let pin = this.loginService.loadPIN() || '';
    this.detailForm = new FormGroup({
      pin: new FormControl(pin)
    });
  }

  onOK() {
    this.loginService.login(this.detailForm.value.pin)
      .subscribe(result => {
        if (result)
          this.router.navigate([this.loginService.redirectUrl]);
      });
  }

  onCancel() {

  }

}