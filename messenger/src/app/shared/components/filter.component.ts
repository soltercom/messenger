import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'alt-filter',
  template: `
  <md-input-container [formGroup]="form">
    <input md-input [placeholder]="placeholder" formControlName="filter">
  </md-input-container>
  `
})
export class FilterComponent implements OnInit {

  @Input() placeholder: string;
  @Output() message = new EventEmitter();

  private form: FormGroup;
  private filter: FormControl;

  ngOnInit() {
    this.form = new FormGroup({});
    this.filter = new FormControl('');
    this.form.addControl("filter", this.filter);
    this.filter.valueChanges.subscribe(
      filter => this.message.emit(filter)
    );
  }

  clearFilter() {
    this.filter.reset('');
  }
}