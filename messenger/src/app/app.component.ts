import { Component } from '@angular/core';
import '../style.css';

@Component({
  selector: 'my-app',
  template: `
    <alt-navbar></alt-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
