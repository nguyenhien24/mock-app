import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './themes/home/home.component';
import { LoginComponent } from './themes/login/login.component';
import { RegisterComponent } from './themes/register/register.component';
import { ResultComponent } from './themes/result/result.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routers/app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './themes/logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './shared/question/question.component';
import { APIService } from './services/api.service';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResultComponent,
    LogoutComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    APIService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
