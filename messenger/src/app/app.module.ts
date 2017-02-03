import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin';
import { LoginModule } from './login';
import { MessengerModule } from "./messenger";
import { NavbarModule } from './navbar';
import { InfoService, InfoComponent } from './shared';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		AdminModule,
		AppRoutingModule,
    LoginModule,
    MessengerModule,
    NavbarModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		InfoService
	],
	entryComponents: [
		InfoComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

