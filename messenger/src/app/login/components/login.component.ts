import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  `
})
export class LoginComponent implements OnInit {

  private detailForm: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    let pin = this.loginService.loadPIN() || '';
    this.detailForm = new FormGroup({
      pin: new FormControl(pin)
    });
    if (pin && !this.activatedRouter.snapshot.queryParams['logout']) {
      this.onOK();
    }
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