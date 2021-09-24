import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './themes/home/home.component';
import { LoginComponent } from './themes/login/login.component';
import { RegisterComponent } from './themes/register/register.component';
import { ResultComponent } from './themes/result/result.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routers/app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
